import {QueryItemInterface} from "./query-item-interface";
import {QueryItem, QueryItemType} from "./query-item-type";
import {Negatable} from "./negatable";
import {LogicalOperator} from "./logical-operator";

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
        this.pushDownNegationForInnerItems();
        this._negated = false; // must be set after the push-down call
    }

    // todo 2466 doc
    public negate(): void {
        if (this._negated) {
            this._negated = false; // forces push-down for items
            this.pushDownNegationForInnerItems();
            return;
        }
        this.negateInnerItems();
    }

    // todo 2466 doc
    protected pushDownNegationForInnerItems(): void {
        for (const item of this._items) {
            if (!item.isNegatable()) {
                continue
            }
            const expression: Negatable = item as Negatable;
            this._negated ? expression.negate() : expression.pushDownNegation();
        }
    }

    // todo 2466 doc
    protected negateInnerItems(): void {
        for (let item of this._items) {
            if (item.type() === QueryItemType.LOGICAL_OPERATOR) {
                item = (item as LogicalOperator).opposite(); // todo 2466 test: vymeni to referenciu v poli?
            } else if (item.isNegatable()) {
                const expression = item as Negatable;
                expression.negate();
            }
        }
    }
}
