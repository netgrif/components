import {QueryItemInterface} from "./query-item-interface";
import {QueryItem, QueryItemType} from "./query-item-type";
import {Negatable} from "./negatable";

/**
 * Represents a complex expression in a PFQL (Process Filter Query Language) query.
 *
 * A complex expression is a composite query item that contains multiple child query items
 * (either simple expressions or other complex expressions) and can be negated.
 * It is used to build hierarchical query structures with logical operations.
 *
 * The class supports negation push-down operations to optimize query execution by
 * distributing negations to inner expressions.
 */
export class ComplexExpression implements QueryItemInterface, Negatable {
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

    public isNegatable(): boolean {
        return true;
    }

    // todo 2466 doc
    public pushDownNegation(): void {
        // todo 2466
        // negate inner expressions
        // set _negated to false
    }
}
