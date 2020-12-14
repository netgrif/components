/**
 * An object that represents a tree of {@link CaseTreeNode} that should be expanded.
 */
export interface ExpansionTree {
    [nodeId: string]: ExpansionTree;
}
