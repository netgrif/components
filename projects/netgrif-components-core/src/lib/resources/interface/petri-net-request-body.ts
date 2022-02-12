/**
 * Describes request body for Petri net search endpoint. Returned Petri nets must fulfill all provided criteria.
 *
 * This object is used with [searchPetriNets()]{@link PetriNetResourceService#searchPetriNets} method in {@link PetriNetResourceService}.
 */
export interface PetriNetRequestBody {
    /**
     * Returned Petri nets (processes) must belong to the group with the specified ID.
     *
     * If more than one ID is specified the returned processes belong to one of the groups.
     */
    group?: string | Array<string>;
    [k: string]: any;
}
