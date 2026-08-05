/**
 * Interface for query items that support negation operations in PFQL queries.
 *
 * This interface provides two approaches to negation:
 * - Direct negation via {@link negate}, which toggles the negation state
 * - Negation push-down via {@link pushDownNegation}, which distributes negation to child items
 *
 * Push-down negation is an optimization technique that moves negation closer to leaf expressions,
 * applying De Morgan's laws to flip logical operators (AND ↔ OR) when necessary.
 *
 * @see ComplexExpression for implementation example
 * @see QueryItemInterface.isNegatable for checking if an item supports negation
 */
export interface Negatable {
    /**
     * Pushes negation down to child query items and clears the negation flag on this item.
     *
     * This method distributes negation to inner expressions and flips logical operators
     * according to De Morgan's laws (AND becomes OR, OR becomes AND). After execution,
     * the negation state of this item is cleared.
     *
     * This is typically called during query optimization to simplify the query structure.
     */
    pushDownNegation(): void;

    /**
     * Toggles or applies negation to this query item.
     *
     * The behavior depends on the current negation state:
     * - If not negated: applies negation by flipping logical operators and negating child items
     * - If already negated: clears negation and pushes it down to child items instead
     *
     * This method is used when constructing or modifying queries to express NOT conditions.
     */
    negate(): void
}
