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
     * Field id, that contains the tab name of the navigation item.
     */
    NAVIGATION_ENTRY_TITLE_FIELD_ID_SUFFIX = 'tab_name',
    /**
     * Boolean field id, that determines if the navigation defines an tab icon.
     */
    NAVIGATION_ENTRY_ICON_ENABLED_FIELD_ID_SUFFIX = 'use_tab_icon',
    /**
     * Text field id, that contains the id of the used material icon.
     */
    NAVIGATION_ENTRY_ICON_FIELD_ID_SUFFIX = 'tab_icon',

    /**
     * Text field id, that contains title of create case button
     * */
    ITEM_FIELD_ID_CREATE_CASE_BUTTON_TITLE = 'create_case_button_title',

    /**
     * Text field id, that contains icon name of create case button
     * */
    ITEM_FIELD_ID_CREATE_CASE_BUTTON_ICON = 'create_case_button_icon',

    /**
     * EnumerationMap field, that contains selected search type for case view
     * */
    ITEM_FIELD_ID_CASE_VIEW_SEARCH_TYPE = 'case_view_search_type',

    /**
     * EnumerationMap field, that contains selected search type for task view
     * */
    ITEM_FIELD_ID_TASK_VIEW_SEARCH_TYPE = 'task_view_search_type',

    /**
     * Boolean field, that is true if user wants to merge base filter and custom filter
     * */
    ITEM_FIELD_ID_MERGE_FILTERS = 'merge_filters',

    /**
     * TaskRef field, that contains taskId of custom filter for task view
     * */
    ITEM_FIELD_ID_ADDITIONAL_FILTER_TASKREF= 'current_additional_filter_preview',

    /**
     * Boolean field, that is true if the user wants to see delete menu in case view
     * */
    ITEM_FIELD_ID_SHOW_DELETE_MENU= 'show_delete_menu',

}
