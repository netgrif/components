/**
 * Holds all identifiers of the Filter process in an accessible manner
 */
export enum UserFilterConstants {
    /**
     * Identifier of the filter process
     */
    FILTER_NET_IDENTIFIER = 'filter',
    /**
     * Transition ID of the "Set filter metadata" transition used for setting filter metadata to new filter cases
     */
    SET_FILTER_METADATA_TRANSITION_ID = 'frontend_create',
    /**
     * Transition ID of the "New Filter" transition displayed in the side menu
     */
    NEW_FILTER_TRANSITION_ID = 'newFilter',
    /**
     * ID of the field containing the saved filter
     */
    FILTER_FIELD_ID = 'filter',
    /**
     * ID of the field containing the saved filter type
     */
    FILTER_TYPE_FIELD_ID = 'filter_type',
    /**
     * ID of the field containing the viewId of the filters origin
     */
    ORIGIN_VIEW_ID_FIELD_ID = 'origin_view_id'
}
