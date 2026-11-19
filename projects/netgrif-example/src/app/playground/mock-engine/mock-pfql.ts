/**
 * A small evaluator of the PFQL queries the advanced search of the libraries sends (`cases: title contains 'x' and ...`),
 * enough for the playground: conditions `<attribute> [not] eq|neq|contains|lt|gt|lte|gte <value>`, `in (a : b)` ranges and
 * `in ('a', 'b')` lists, `and` / `or` / `not` and parentheses. Values: strings ('x', `'x'*` = starts with), numbers, dates
 * (2026-10-16), date times (2026-10-16T10:00:00), true / false, null and `loggedUser.*`.
 *
 * The attribute values come from the `access` function of the caller (title, processIdentifier, data.<id>.value, ...).
 */

export type PfqlAccess = (item: any, attribute: string) => any;
export type PfqlPredicate = (item: any) => boolean;

type Token = { kind: 'string' | 'word' | 'punct', text: string };

type Value = { kind: 'string' | 'like' | 'number' | 'date' | 'datetime' | 'boolean' | 'null' | 'user', value: any };

type Node =
    | { type: 'and' | 'or', items: Array<Node> }
    | { type: 'not', item: Node }
    | { type: 'cmp', attribute: string, op: string, negate: boolean, value?: Value, list?: Array<Value>, range?: [Value, Value] };

const OPERATORS: { [symbol: string]: string } = {
    'eq': 'eq', '==': 'eq', 'neq': 'neq', '!=': 'neq', 'contains': 'contains', '~': 'contains',
    'lt': 'lt', '<': 'lt', 'gt': 'gt', '>': 'gt', 'lte': 'lte', '<=': 'lte', 'gte': 'gte', '>=': 'gte', 'in': 'in',
};

/** the condition part of the query (after `cases:` / `cases where`), `undefined` = no condition */
function conditions(query: string): string | undefined {
    const match = query.match(/^\s*\w+\s*(?::|\s+where\s+)(.*)$/is);
    const rest = (match ? match[1] : query).trim();
    return rest.length > 0 ? rest : undefined;
}

function tokenize(text: string): Array<Token> {
    const tokens: Array<Token> = [];
    let i = 0;
    while (i < text.length) {
        const c = text[i];
        if (/\s/.test(c)) {
            i++;
        } else if (c === '\'') {
            const end = text.indexOf('\'', i + 1);
            const stop = end < 0 ? text.length : end;
            tokens.push({kind: 'string', text: text.substring(i + 1, stop)});
            i = stop + 1;
        } else if ('()[],:*'.includes(c)) {
            tokens.push({kind: 'punct', text: c});
            i++;
        } else if ('=!~<>&|'.includes(c)) {
            const two = text.substring(i, i + 2);
            const symbol = ['==', '!=', '<=', '>=', '&&', '||'].includes(two) ? two : c;
            tokens.push({kind: 'word', text: symbol === '&&' || symbol === '&' ? 'and' : symbol === '||' || symbol === '|' ? 'or'
                    : symbol === '!' ? 'not' : symbol});
            i += symbol.length;
        } else {
            let j = i;
            // dates and date times contain ':' (10:00:00), the range separator is surrounded by spaces
            while (j < text.length && !/\s/.test(text[j]) && !'()[],\''.includes(text[j])
            && !(text[j] === ':' && !/^\d{4}-\d\d-\d\dT\d\d$|^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(text.substring(i, j)))) {
                j++;
            }
            tokens.push({kind: 'word', text: text.substring(i, j)});
            i = j;
        }
    }
    return tokens;
}

class Parser {
    private position = 0;

    constructor(private readonly tokens: Array<Token>) {
    }

    parse(): Node {
        const node = this.or();
        if (this.position < this.tokens.length) {
            throw new Error(`unexpected '${this.tokens[this.position].text}'`);
        }
        return node;
    }

    private peek(): Token | undefined {
        return this.tokens[this.position];
    }

    private next(): Token {
        const token = this.tokens[this.position++];
        if (!token) {
            throw new Error('unexpected end of the query');
        }
        return token;
    }

    private isWord(text: string): boolean {
        const token = this.peek();
        return token?.kind === 'word' && token.text.toLowerCase() === text;
    }

    private expect(text: string): void {
        const token = this.next();
        if (token.text !== text) {
            throw new Error(`expected '${text}', got '${token.text}'`);
        }
    }

    private or(): Node {
        const items = [this.and()];
        while (this.isWord('or')) {
            this.next();
            items.push(this.and());
        }
        return items.length === 1 ? items[0] : {type: 'or', items};
    }

    private and(): Node {
        const items = [this.unary()];
        while (this.isWord('and')) {
            this.next();
            items.push(this.unary());
        }
        return items.length === 1 ? items[0] : {type: 'and', items};
    }

    private unary(): Node {
        if (this.isWord('not')) {
            this.next();
            return {type: 'not', item: this.unary()};
        }
        const token = this.peek();
        if (token?.kind === 'punct' && token.text === '(') {
            this.next();
            const node = this.or();
            this.expect(')');
            return node;
        }
        return this.comparison();
    }

    private comparison(): Node {
        const attribute = this.next().text;
        let negate = false;
        if (this.isWord('not')) {
            this.next();
            negate = true;
        }
        const symbol = this.next().text.toLowerCase();
        const op = OPERATORS[symbol];
        if (!op) {
            throw new Error(`unknown operator '${symbol}'`);
        }
        if (op !== 'in') {
            return {type: 'cmp', attribute, op, negate, value: this.value()};
        }
        this.expect(this.peek()?.text === '[' ? '[' : '(');
        const first = this.value();
        if (this.peek()?.text === ':') {
            this.next();
            const second = this.value();
            this.next(); // ')' or ']'
            return {type: 'cmp', attribute, op: 'range', negate, range: [first, second]};
        }
        const list = [first];
        while (this.peek()?.text === ',') {
            this.next();
            list.push(this.value());
        }
        this.expect(')');
        return {type: 'cmp', attribute, op: 'list', negate, list};
    }

    private value(): Value {
        const token = this.next();
        if (token.kind === 'string') {
            if (this.peek()?.text === '*') {
                this.next();
                return {kind: 'like', value: token.text};
            }
            return {kind: 'string', value: token.text};
        }
        const text = token.text;
        if (/^\d{4}-\d\d-\d\dT\d\d:\d\d(:\d\d(\.\d+)?)?$/.test(text)) {
            return {kind: 'datetime', value: new Date(text).getTime()};
        }
        if (/^\d{4}-\d\d-\d\d$/.test(text)) {
            return {kind: 'date', value: text};
        }
        if (/^-?\d+(\.\d+)?$/.test(text)) {
            return {kind: 'number', value: Number(text)};
        }
        if (/^(true|false)$/i.test(text)) {
            return {kind: 'boolean', value: text.toLowerCase() === 'true'};
        }
        if (/^null$/i.test(text)) {
            return {kind: 'null', value: null};
        }
        if (/^loggedUser\./i.test(text)) {
            return {kind: 'user', value: text};
        }
        return {kind: 'string', value: text};
    }
}

/* ------------------------------------------------------------ evaluation */

function dayOf(value: any): string | undefined {
    const date = toDate(value);
    if (!date) {
        return undefined;
    }
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function toDate(value: any): Date | undefined {
    if (value instanceof Date) {
        return value;
    }
    if (Array.isArray(value) && typeof value[0] === 'number') {
        return new Date(value[0], (value[1] ?? 1) - 1, value[2] ?? 1, value[3] ?? 0, value[4] ?? 0, value[5] ?? 0);
    }
    if (typeof value === 'string' || typeof value === 'number') {
        const date = new Date(value);
        return isNaN(date.getTime()) ? undefined : date;
    }
    return undefined;
}

/** -1 / 0 / 1, `undefined` when not comparable */
function compare(actual: any, expected: Value, user: (attribute: string) => any): number | undefined {
    if (actual === undefined || actual === null) {
        return undefined;
    }
    switch (expected.kind) {
        case 'number': {
            const n = Number(actual);
            return isNaN(n) ? undefined : Math.sign(n - expected.value);
        }
        case 'date': {
            const day = dayOf(actual);
            return day === undefined ? undefined : day < expected.value ? -1 : day > expected.value ? 1 : 0;
        }
        case 'datetime': {
            const date = toDate(actual);
            return date === undefined ? undefined : Math.sign(date.getTime() - expected.value);
        }
        case 'boolean':
            return (actual === true || actual === 'true') === expected.value ? 0 : 1;
        case 'user': {
            const value = String(user(expected.value) ?? '').toLowerCase();
            return String(actual).toLowerCase() === value ? 0 : 1;
        }
        default: {
            const a = String(actual).toLowerCase();
            const e = String(expected.value).toLowerCase();
            return a < e ? -1 : a > e ? 1 : 0;
        }
    }
}

function matchesOne(actual: any, node: Extract<Node, { type: 'cmp' }>, user: (attribute: string) => any): boolean {
    if (node.op === 'list') {
        return node.list.some(v => compare(actual, v, user) === 0);
    }
    if (node.op === 'range') {
        const low = compare(actual, node.range[0], user);
        const high = compare(actual, node.range[1], user);
        return low !== undefined && high !== undefined && low >= 0 && high <= 0;
    }
    const value = node.value;
    if (value.kind === 'null') {
        const empty = actual === undefined || actual === null || actual === '' || (Array.isArray(actual) && actual.length === 0);
        return node.op === 'neq' ? !empty : empty;
    }
    if (value.kind === 'like') {
        return actual !== undefined && actual !== null && String(actual).toLowerCase().startsWith(String(value.value).toLowerCase());
    }
    if (node.op === 'contains') {
        return actual !== undefined && actual !== null && String(actual).toLowerCase().includes(String(value.value).toLowerCase());
    }
    const result = compare(actual, value, user);
    switch (node.op) {
        case 'eq':
            return result === 0;
        case 'neq':
            return result !== 0;
        case 'lt':
            return result !== undefined && result < 0;
        case 'lte':
            return result !== undefined && result <= 0;
        case 'gt':
            return result !== undefined && result > 0;
        case 'gte':
            return result !== undefined && result >= 0;
    }
    return false;
}

function evaluate(node: Node, item: any, access: PfqlAccess, user: (attribute: string) => any): boolean {
    switch (node.type) {
        case 'and':
            return node.items.every(n => evaluate(n, item, access, user));
        case 'or':
            return node.items.some(n => evaluate(n, item, access, user));
        case 'not':
            return !evaluate(node.item, item, access, user);
        case 'cmp': {
            const actual = access(item, node.attribute);
            // multichoice / list values: one of the values matches (neq: none of them)
            const list = Array.isArray(actual) && !(typeof actual[0] === 'number' && actual.length >= 3 && node.attribute
                .toLowerCase().includes('date'));
            const values = !list ? [actual] : actual.length > 0 ? actual : [undefined];
            const matched = node.op === 'neq' && node.value?.kind !== 'null'
                ? values.every(v => matchesOne(v, node, user))
                : values.some(v => matchesOne(v, node, user));
            return node.negate ? !matched : matched;
        }
    }
}

/**
 * @returns predicate of the query, `undefined` when the query has no condition (all items match)
 * @throws Error when the query can not be parsed
 */
export function compilePfql(query: string, access: PfqlAccess, user: (attribute: string) => any): PfqlPredicate | undefined {
    const condition = conditions(query);
    if (condition === undefined) {
        return undefined;
    }
    const tree = new Parser(tokenize(condition)).parse();
    return item => evaluate(tree, item, access, user);
}
