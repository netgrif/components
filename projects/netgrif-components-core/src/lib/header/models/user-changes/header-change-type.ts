export enum HeaderChangeType {
    /**
     * Emitted when one of the headers changes the value that is should display
     */
    EDIT = 'edit',
    /**
     * Emitted when the header mode changes to another one
     */
    MODE_CHANGED = 'mode-changed',
    /**
     * Emitted when the search input in one of the headers changes
     */
    SEARCH = 'search',
    /**
     * Emitted when the sort direction in one of the headers changes
     */
    SORT = 'sort'
}
