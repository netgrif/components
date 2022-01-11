import {EscapeResult} from '../escape-result';
import {Query} from '../query/query';
import {BooleanOperator} from '../boolean-operator';
import {WrapResult} from '../wrap-result';
import {Operators} from './operators';

/**
 * Represents the low level abstraction of query generation that is responsible for the creation of queries themselves.
 *
 * Operators are ment to be stateless and held as singleton instances, as they can be shared without any issues.
 * This library uses the {@link OperatorService} to store the singleton instances, but you can use your own solution,
 * or instantiate them multiple times if you prefer.
 *
 * @typeparam T type of arguments this Operator can generate queries from
 */
export abstract class Operator<T> {

    /**
     * Represents the placeholder "block" in operator display names.
     */
    public static readonly INPUT_PLACEHOLDER = '';

    /**
     * Reserved characters for Elasticsearch queries. These characters can be escaped with a `\` character.
     */
    private static readonly ESCAPABLE_CHARACTERS = new Set(
        ['+', '-', '=', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\', '/']);

    /**
     * Reserved characters for Elasticsearch queries. These characters cannot be escaped and must be removed from queries.
     */
    private static readonly UNESCAPABLE_CHARACTERS = new Set(['<', '>']);

    /**
     * Determines the arity of the operator, that is the number of arguments/operands it takes.
     */
    private readonly _numberOfOperands: number;

    /**
     * The operator symbol that is used to generate the query.
     */
    private readonly _operatorSymbols: string;

    protected constructor(numberOfOperands: number, operatorSymbols = '') {
        this._numberOfOperands = numberOfOperands;
        this._operatorSymbols = operatorSymbols;
    }

    /**
     * Escapes all escapable Elasticsearch symbols. Removes all unescapable Elasticsearch symbols.
     *
     * For a list of symbols see Elasticsearch's Query string query
     * [doc]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#_reserved_characters}.
     * @param input user input that should have special characters escaped
     * @returns user input with the escapable characters escaped and the unescapable characters removed
     */
    public static escapeInput(input: string): EscapeResult {
        if (typeof input === 'string') {
            let escaped = false;
            let output = '';
            for (let i = 0; i < input.length; i++) {
                if (Operator.UNESCAPABLE_CHARACTERS.has(input.charAt(i)))
                    continue;
                if (Operator.ESCAPABLE_CHARACTERS.has(input.charAt(i))) {
                    output += '\\';
                    escaped = true;
                }
                output += input.charAt(i);
            }
            return {value: output, wasEscaped: escaped};
        }
        return {value: input, wasEscaped: false};
    }

    /**
     * Creates a Query string query string literal with the provided arguments.
     * @param elasticKeyword Elasticsearch index keyword for the field you want to query
     * @param arg The value that you want to query the property for
     * @param operator The operator you want to use to query the indexed field. Consult the Elasticsearch's
     * [documentation]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html}
     * for more information.
     * @returns combines the input strings by this pattern: `([elasticKeyword]:[operator][arg])`
     */
    public static query(elasticKeyword: string, arg: string, operator: string): string {
        return `(${elasticKeyword}:${operator}${arg})`;
    }

    /**
     * Applies the provided function to all keywords and combines the resulting queries with an `OR` operator.
     * @param elasticKeywords keywords that the function is call on
     * @param queryConstructor function that generates a `Query` object for each keyword
     */
    public static forEachKeyword(elasticKeywords: Array<string>, queryConstructor: (keyword: string) => Query): Query {
        const simpleQueries = [];
        elasticKeywords.forEach(keyword => {
            simpleQueries.push(queryConstructor(keyword));
        });
        return Query.combineQueries(simpleQueries, BooleanOperator.OR);
    }

    /**
     * If the value contains a space character, or if `force` is set to `true`.
     * @param input user input that should be wrapped with double quotes
     * @param forceWrap if set to `true` the value will be wrapped regardless of it's content
     */
    public static wrapInputWithQuotes(input: string, forceWrap = false): WrapResult {
        if (typeof input === 'string' && (input.includes(' ') || forceWrap))
            return {value: `"${input}"`, wasWrapped: true};
        else
            return {value: input, wasWrapped: false};
    }

    /**
     * @returns the arity of the operator.
     */
    public get numberOfOperands(): number {
        return this._numberOfOperands;
    }

    /**
     * Simple implementation of query generation. Will not be suitable for all Operator derivatives.
     *
     * Escapes the first argument from the `args` array, calls the [query()]{@link Operator#query} function for each `keyword` and combines
     * the results with an `OR` operator.
     * @returns query that wos constructed with the given arguments and keywords. Returns an empty query if no arguments are provided.
     */
    public createQuery(elasticKeywords: Array<string>, args: Array<T>, escapeArgs = true): Query {
        this.checkArgumentsCount(args);
        return Operator.forEachKeyword(elasticKeywords, (keyword: string) => {
            const escapedValue = escapeArgs ?
                Operator.escapeInput(args[0] as unknown as string) : ({value: args[0] as unknown as string, wasEscaped: false});
            const wrappedValue = Operator.wrapInputWithQuotes(escapedValue.value, escapedValue.wasEscaped);
            const queryString = Operator.query(keyword, wrappedValue.value, this._operatorSymbols);
            return new Query(queryString);
        });
    }

    /**
     * The name template is used when generating search GUI, and so the arity of the operator should match the number of
     * {@link INPUT_PLACEHOLDER} constant occurrences in the returned array.
     *
     * @returns an array of translation paths that represent the operator name, as it should be displayed to the user.
     * The {@link INPUT_PLACEHOLDER} constant (or any falsy value) can be used to place visual input placeholder blocks in the
     * operator name where user input is expected.
     */
    public abstract getOperatorNameTemplate(): Array<string>;

    /**
     * @returns the operator class in a serializable form
     */
    public abstract serialize(): Operators | string;

    /**
     * Checks whether the provided array contains at leas as many arguments, as is the operators number of operands.
     * Throws an error if not enough arguments is provided.
     * @param args an array of potential operands
     */
    protected checkArgumentsCount(args: Array<any>): void {
        if (args.length < this.numberOfOperands) {
            throw new Error(`At least ${this.numberOfOperands} arguments must be provided to `
                + `create a query with ${this.numberOfOperands} operands!`);
        }
    }
}
