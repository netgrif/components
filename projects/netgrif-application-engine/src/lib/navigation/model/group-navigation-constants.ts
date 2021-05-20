export enum GroupNavigationConstants {
    /**
     * Name of the component that indicates the position of the group specific navigation elements.
     */
    GROUP_NAVIGATION_OUTLET = 'groupNavigation',
    /**
     * Id of the transition that stores the group navigation menu data
     */
    NAVIGATION_CONFIG_TRANSITION_ID = 'navigationMenuConfig',
    /**
     * Suffix of the field id that contains the name of the navigation entry.
     * Since the field itself is inserted via task ref the actual id is prefixed by the task id.
     */
    NAVIGATION_ENTRY_TITLE_FIELD_ID_SUFFIX = 'entry_name',
    /**
     * Offset of the first datagroup that contains group navigation data from the start of the task data.
     */
    FIRST_ENTRY_DATAGROUP_OFFSET = 1
}
