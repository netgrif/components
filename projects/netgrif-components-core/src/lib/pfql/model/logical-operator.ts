import {QueryItemType} from "./query-item-type";
import {QueryItemInterface} from "./query-item-interface";
import {BooleanOperator} from "../../search/models/boolean-operator";

/**
 * Represents a logical operator (AND, OR, NOT) used in PFQL query construction.
 *
 * This class implements the {@link QueryItemInterface} and serves as a wrapper for {@link BooleanOperator} values,
 * allowing them to be used as part of a query structure. Logical operators are used to combine multiple
 * query conditions or predicates in a boolean expression.
 *
 * @see BooleanOperator for available operator types
 * @see QueryItemInterface for the common interface of query items
 * @see Query.combineQueries for usage example of combining queries with boolean operators
 */
export class LogicalOperator implements QueryItemInterface {
    protected _value: BooleanOperator

    public constructor(value: BooleanOperator) {
        this._value = value;
    }

    public type(): QueryItemType {
        return QueryItemType.LOGICAL_OPERATOR;
    }

    public get value(): BooleanOperator {
        return this._value;
    }

    public isNegatable(): boolean {
        return false;
    }

    /**
     * Returns the logical opposite of the current operator.
     *
     * This method returns a new LogicalOperator instance with the opposite boolean operator:
     * - If the current operator is OR, returns AND
     * - If the current operator is AND, returns OR
     *
     * Note: This method does not handle the NOT operator as it operates only on binary operators (AND/OR).
     *
     * @returns a new LogicalOperator instance with the opposite operator value
     */
    public opposite(): LogicalOperator {
        return this.value === BooleanOperator.OR ? new LogicalOperator(BooleanOperator.AND) : new LogicalOperator(BooleanOperator.OR);
    }
}
