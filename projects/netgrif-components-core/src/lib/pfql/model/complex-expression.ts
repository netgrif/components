import {LogicalOperator} from "./logical-operator";
import {QueryItemInterface} from "./query-item-interface";
import {QueryItem, QueryItemType} from "./query-item-type";

// todo 2466
export class ComplexExpression implements QueryItemInterface {
    protected _negated: boolean;
    protected _items: QueryItem[];
    protected _logicalOperator: LogicalOperator;

    public constructor(negated: boolean, items: QueryItem[], logicalOperator: LogicalOperator) {
        this._negated = negated;
        this._items = !items ? [] : items;
        this._logicalOperator = logicalOperator;
    }

    public type(): QueryItemType {
        return QueryItemType.COMPLEX_EXPRESSION;
    }

    public pushItems(items: QueryItem[]) {
        this._items.push(...items);
    }

    public get items(): QueryItem[] {
        return this._items;
    }

    public get isNegated(): boolean {
        return this._negated;
    }

    public get logicalOperator(): LogicalOperator {
        return this._logicalOperator;
    }

    // todo 2466
    public pushDownNegation(): void {
        // negate inner expressions
        // set _negated to false
    }
}
