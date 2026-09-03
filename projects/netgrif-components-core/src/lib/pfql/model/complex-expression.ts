import {QueryItemInterface} from "./query-item-interface";
import {QueryItem, QueryItemType} from "./query-item-type";

/**
 * Represents a complex expression in a PFQL (Process Filter Query Language) query.
 *
 * A complex expression is a composite query item that contains multiple child query items
 * (either simple expressions or other complex expressions).
 * It is used to build hierarchical query structures with logical operations.
 */
export class ComplexExpression implements QueryItemInterface {
    protected _items: QueryItem[];

    public constructor(items: QueryItem[]) {
        this._items = !items ? [] : items;
    }

    public type(): QueryItemType {
        return QueryItemType.COMPLEX_EXPRESSION;
    }

    public get items(): QueryItem[] {
        return this._items;
    }

    public set items(items: QueryItem[]) {
        this._items = items;
    }
}
