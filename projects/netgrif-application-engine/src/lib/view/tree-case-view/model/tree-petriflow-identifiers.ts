/**
 * Contains the ids of the elements in Petriflow process that are used to represent the tree structure
 */
export enum TreePetriflowIdentifiers {
    /**
     * Immediate case ref data variable that contains the children of this tree node
     */
    CHILDREN_CASE_REF = 'treeChildCases',
    /**
     * Immediate boolean data variable that determines whether this node can add new child nodes or not.
     *
     * The type of node added is determined by the `allowedNets` property of the case ref field that holds the children
     */
    CAN_ADD_CHILDREN = 'canAddTreeChildren',
    /**
     * Immediate text data variable that contains the id of the transition who's task should be displayed when the case node is selected.
     */
    FEATURED_TRANSITION = 'treeTaskTransitionId',
    /**
     * Id of the transition that is executed to set the new child data
     */
    ADD_CHILD_TRANSITION = 'add_tree_child'
}
