import {QueryItemType} from "./query-item-type";

/**
 * Base interface for all items that can be part of a PFQL (Process Filter Query Language) query structure.
 *
 * This interface defines the common contract for query components, including simple expressions,
 * complex expressions, and logical operators. Each query item has a type and may or may not
 * support negation operations.
 *
 * @see QueryItemType for available query item types
 * @see ComplexExpression for composite query items
 * @see LogicalOperator for boolean operators in queries
 */
export interface QueryItemInterface {
    /**
     * Returns the type of this query item.
     *
     * @returns The {@link QueryItemType} enum value indicating whether this is a simple expression,
     * complex expression, or logical operator.
     */
    type(): QueryItemType;
}
