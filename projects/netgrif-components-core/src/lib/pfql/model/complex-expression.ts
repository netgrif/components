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

    /**
     * Pushes down the negation flag to child items in the expression tree.
     * If the expression is negated, this method propagates the negation to all child items
     * by negating them and converting logical operators to their opposites (AND <-> OR).
     * After propagation, the negation flag on this expression is cleared.
     * This normalization ensures that negation is represented at the leaf level rather than
     * at the complex expression level, which can optimize query execution.
     */
    public pushDownNegation(): void {
        this.pushDownNegationForInnerItems();
        this._negated = false; // must be set after the push-down call
    }

    /**
     * Toggles the negation state of this complex expression.
     * If the expression is currently negated, clears the negation flag and pushes down
     * the negation to child items. If the expression is not negated, negates all child items
     * and converts logical operators to their opposites without setting the negation flag.
     * This method applies De Morgan's laws to maintain logical equivalence.
     */
    public negate(): void {
        if (this._negated) {
            this._negated = false; // forces push-down for items
            this.pushDownNegationForInnerItems();
            return;
        }
        this.negateInnerItems();
    }

    /**
     * Propagates negation to all child items in this complex expression.
     * For each child item:
     * - If this expression is negated and the child is a logical operator, replaces it with its opposite (AND <-> OR)
     * - If the child is negatable and this expression is negated, negates the child
     * - If the child is negatable and this expression is not negated, recursively pushes down negation on the child
     * This method is called internally to distribute negation throughout the expression tree.
     */
    protected pushDownNegationForInnerItems(): void {
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (this._negated && item.type() === QueryItemType.LOGICAL_OPERATOR) {
                this._items[i] = (item as LogicalOperator).opposite();
            } else if (item.isNegatable()) {
                const expression: Negatable = item as Negatable;
                this._negated ? expression.negate() : expression.pushDownNegation();
            }
        }
    }

    /**
     * Negates all child items in this complex expression without setting the negation flag.
     * For each child item:
     * - If the child is a logical operator, replaces it with its opposite (AND <-> OR)
     * - If the child is negatable (simple or complex expression), negates it
     * This method is used to apply De Morgan's laws when negating the entire complex expression.
     */
    protected negateInnerItems(): void {
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (item.type() === QueryItemType.LOGICAL_OPERATOR) {
                this._items[i] = (item as LogicalOperator).opposite();
            } else if (item.isNegatable()) {
                const expression = item as Negatable;
                expression.negate();
            }
        }
    }
}
