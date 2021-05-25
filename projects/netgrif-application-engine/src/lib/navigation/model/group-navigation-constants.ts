export enum GroupNavigationConstants {
    /**
     * Name of the component that indicates the position of the group specific navigation elements.
     */
    GROUP_NAVIGATION_OUTLET = 'groupNavigation',
    /**
     * Name of the router param that is used to provide information about the selected filter to the group navigation view component
     */
    GROUP_NAVIGATION_ROUTER_PARAM = 'filterCaseId',
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
     * Suffix of the field id that contains the filter case id.
     * Since the field itself is inserted via task ref the actual id is prefixed by the task id.
     */
    NAVIGATION_FILTER_CASE_ID_FIELD_ID_SUFFIX = 'filter_case_id',
    /**
     * Offset of the first datagroup that contains group navigation data from the start of the task data.
     */
    FIRST_ENTRY_DATAGROUP_OFFSET = 3
}
