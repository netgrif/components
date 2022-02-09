/**
 * Contains the ids of the elements in Petriflow process that are used to represent the tree structure
 */
export enum TreePetriflowIdentifiers {
    /**
     * Immediate case ref data variable that contains the children of this tree node
     */
    CHILDREN_CASE_REF = 'treeChildCases',
    /**
     * Immediate boolean data variable that determines whether the option to can add new child nodes should be displayed.
     *
     * The type of node added is determined by the `allowedNets` property of the case ref field that holds the children
     */
    CAN_ADD_CHILDREN = 'canAddTreeChildren',
    /**
     * Immediate text data variable that contains the id of the transition who's task should be displayed when the case node is selected.
     */
    FEATURED_TRANSITION = 'treeTaskTransitionId',
    /**
     * Immediate boolean data variable that determines whether the option to remove this node from the tree should be displayed
     */
    CAN_REMOVE_NODE = 'canRemoveTreeNode',
    /**
     * Immediate text data variable that contains the default case title for this node's children.
     *
     * If no value is provided an appropriate translation of 'New Node' will be used instead.
     */
    CHILD_NODE_TITLE = 'childNodeCaseTitle',
    /**
     * Id of the transition that is executed to set the new child data
     */
    CASE_REF_TRANSITION = 'treeCaseRefAccessor',
    /**
     * Before text icon
     */
    BEFORE_TEXT_ICON = 'beforeTextIcon',
    /**
     * Add icon in tree
     */
    TREE_ADD_ICON = 'treeAddIcon',
}
