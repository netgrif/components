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
     * Boolean field id, that determines if the navigation defines a tab icon.
     */
    NAVIGATION_ENTRY_ICON_ENABLED_FIELD_ID_SUFFIX = 'use_tab_icon',
    /**
     * Text field id, that contains the id of the used material icon.
     */
    NAVIGATION_ENTRY_ICON_FIELD_ID_SUFFIX = 'tab_icon',

    /**
     * TaskRef field, that contains taskId of filter task
     * */
    ITEM_FIELD_ID_FILTER_TASKREF = 'current_filter_preview',

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
    ITEM_FIELD_ID_ADDITIONAL_FILTER_TASKREF = 'current_additional_filter_preview',

    /**
     * Boolean field, that is true if the user wants to see more menu for case item in case view
     * */
    ITEM_FIELD_ID_CASE_SHOW_MORE_MENU = 'case_show_more_menu',

    /**
     * Boolean field, that is true if no input for title in case creation is shown
     * */
    ITEM_FIELD_ID_CASE_TITLE_IN_CREATION = 'case_require_title_in_creation',

    /**
     * Text field, that contains banned processes in case creation as a value
     * */
    ITEM_FIELD_ID_CASE_BANNED_PROCESS_CREATION = 'case_banned_nets_in_creation',

    /**
     * Boolean field, that is true if the user wants to see more menu for task item in task view
     * */
    ITEM_FIELD_ID_TASK_SHOW_MORE_MENU = 'task_show_more_menu',

    /**
     * MultichoiceMap field, that contains selected header modes for case view as a value
     * */
    ITEM_FIELD_ID_CASE_HEADERS_MODE = 'case_headers_mode',

    /**
     * Boolean field, that is true if table mode can be applied in case view
     * */
    ITEM_FIELD_ID_CASE_ALLOW_TABLE_MODE = 'case_allow_header_table_mode',

    /**
     * EnumerationMap field, that contains selected default header mode for case view as a value
     * */
    ITEM_FIELD_ID_CASE_DEFAULT_HEADERS_MODE = 'case_headers_default_mode',

    /**
     * Boolean field, that is true to make mode menu in case view visible
     * */
    ITEM_FIELD_ID_CASE_HEADERS_CHANGEABLE = 'case_is_header_mode_changeable',

    /**
     * MultichoiceMap field, that contains selected header modes for task view as a value
     * */
    ITEM_FIELD_ID_TASK_HEADERS_MODE = 'task_headers_mode',

    /**
     * Boolean field, that is true if table mode can be applied in task view
     * */
    ITEM_FIELD_ID_TASK_ALLOW_TABLE_MODE = 'task_allow_header_table_mode',

    /**
     * EnumerationMap field, that contains selected default header mode for task view as a value
     * */
    ITEM_FIELD_ID_TASK_DEFAULT_HEADERS_MODE = 'task_headers_default_mode',

    /**
     * Boolean field, that is true to make mode menu in task view visible
     * */
    ITEM_FIELD_ID_TASK_HEADERS_CHANGEABLE = 'task_is_header_mode_changeable',

    /**
     * Boolean field, that is true to use default headers configuration for case view
     * */
    ITEM_FIELD_ID_USE_CASE_DEFAULT_HEADERS = 'use_case_default_headers',

    /**
     * Text field, that contains default header metadata separated by comma for case view as a value
     * */
    ITEM_FIELD_ID_CASE_DEFAULT_HEADERS = 'case_default_headers',

    /**
     * Boolean field, that is true to use default headers configuration for task view
     * */
    ITEM_FIELD_ID_USE_TASK_DEFAULT_HEADERS = 'use_task_default_headers',

    /**
     * Text field, that contains default header metadata separated by comma for task view as a value
     * */
    ITEM_FIELD_ID_TASK_DEFAULT_HEADERS = 'task_default_headers',

    /**
     * MultichoiceMap field, that contains allowed roles as value
     * */
    ITEM_FIELD_ID_ALLOWED_ROLES = 'allowed_roles',

    /**
     * MultichoiceMap field, that contains banned roles as value
     * */
    ITEM_FIELD_ID_BANNED_ROLES = 'banned_roles',

    /**
     * Text field, that contains icon identifier
     * */
    ITEM_FIELD_ID_MENU_ICON = 'menu_icon',

    /**
     * I18n field, that contains labels of menu item
     * */
    ITEM_FIELD_ID_MENU_NAME = 'menu_name',

    /**
     * Text field, that contains URI
     * */
    ITEM_FIELD_ID_NODE_PATH = 'nodePath',

    /**
     * Boolean field, that is true if item contains child items
     * */
    ITEM_FIELD_ID_HAS_CHILDREN = 'hasChildren',

    /**
     * CaseField containing stringIds of child instances of process preference_item
     * */
    ITEM_FIELD_ID_CHILD_ITEM_IDS = 'childItemIds',

}
