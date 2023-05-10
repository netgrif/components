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
     * Suffix of the field id that contains the name of the navigation entry.
     * Since the field itself is inserted via task ref the actual id is prefixed by the task id.
     */
    NAVIGATION_ENTRY_TITLE_FIELD_ID_SUFFIX = 'entry_name',
    /**
     * Suffix of the boolean field id that determines if the navigation entry defines an icon.
     * Since the field itself is inserted via task ref the actual id is prefixed by the task id.
     */
    NAVIGATION_ENTRY_ICON_ENABLED_FIELD_ID_SUFFIX = 'use_icon',
    /**
     * Suffix of the text field id that contains the id of the used material icon.
     * Since the field itself is inserted via task ref the actual id is prefixed by the task id.
     */
    NAVIGATION_ENTRY_ICON_FIELD_ID_SUFFIX = 'icon',
}
