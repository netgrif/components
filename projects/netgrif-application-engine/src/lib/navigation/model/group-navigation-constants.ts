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
     * Id of the task ref field that holds the ids of the individual navigation item tasks
     */
    NAVIGATION_ENTRIES_TASK_REF_FIELD_ID = 'filter_tasks',
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
     * Suffix of the field id that is the navigation entry marker.
     * Since the field itself is inserted via task ref the actual id is prefixed by the task id.
     */
    NAVIGATION_ENTRY_MARKER_FIELD_ID_SUFFIX = 'entry_marker',
    /**
     * Suffix of the boolean field id that determines if the navigation entry defines an icon.
     * Since the field itself is inserted via task ref the actual id is prefixed by the task id.
     */
    NAVIGATION_ENTRY_ICON_ENABLED_FIELD_ID_SUFFIX = 'use_icon',
    /**
     * Suffix of the text field id that contains the id of the used material icon.
     * Since the field itself is inserted via task ref the actual id is prefixed by the task id.
     */
    NAVIGATION_ENTRY_ICON_FIELD_ID_SUFFIX = 'icon_name',
    /**
     * Suffix of the text field id that contains the IDs of roles that are able to view the navigation entry.
     * Since the field itself is inserted via task ref the actual id is prefixed by the task id.
     */
    NAVIGATION_ENTRY_PERMITTED_ROLES_FIELD_ID_SUFFIX = 'allowed_roles',
    /**
     * Suffix of the text field id that contains the IDs of roles that are banned from viewing the navigation entry.
     * Since the field itself is inserted via task ref the actual id is prefixed by the task id.
     */
    NAVIGATION_ENTRY_BANNED_ROLES_FIELD_ID_SUFFIX = 'banned_roles',
    /**
     * The number of datagroups in the navigation configuration task that correspond to a single navigation entry.
     */
    DATAGROUPS_PER_NAVIGATION_ENTRY = 2,
}
