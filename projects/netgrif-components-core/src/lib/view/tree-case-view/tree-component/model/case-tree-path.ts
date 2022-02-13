/**
 * A path in a case ref tree structure.
 *
 * Attributes are stringIds of child cases. Their values are arrays containing the path from root to the child.
 */
export interface CaseTreePath {
    [childId: string]: Array<string>;
}
