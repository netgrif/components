import {QueryItemInterface} from "./query-item-interface";
import {QueryItem, QueryItemType} from "./query-item-type";

// todo 2466
export class ComplexExpression implements QueryItemInterface {
    protected _negated: boolean;
    protected _items: QueryItem[];

    public constructor(negated: boolean, items: QueryItem[]) {
        this._negated = negated;
        this._items = !items ? [] : items;
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

    public set items(items: QueryItem[]) {
        this._items = items;
    }

    public get isNegated(): boolean {
        return this._negated;
    }

    // todo 2466
    public pushDownNegation(): void {
        // negate inner expressions
        // set _negated to false
    }
}
