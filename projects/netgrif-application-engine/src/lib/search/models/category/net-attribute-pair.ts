/**
 * An interface representing a pair of searched attribute id and its net id.
 *
 * Used for searching on attributes that have unique ids or names only within a single net and are net sensitive when searching.
 */
export interface NetAttributePair {
    /**
     * Identifier or stringId of the net the attribute belongs to.
     *
     * Cases use identifier, Tasks use stringId.
     */
    netId: string;
    /**
     * Unique identifier of the searched attribute
     */
    attributeId: string;
}
