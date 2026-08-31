export enum SearchIndex {
    /**
     * Indexed as TEXT
     *
     * Used by all fields
     */
    FULLTEXT = 'fulltextValue',
    /**
     * Indexed as BOOLEAN
     *
     * Used by BooleanFields
     */
    BOOLEAN = 'booleanValue',
    /**
     * Indexed as DATE
     *
     * Used by both Date and DateTime Fields
     */
    DATE = 'dateValue',
    /**
     * Indexed as LONG
     *
     * Used by both Date and DateTime Fields
     */
    TIMESTAMP = 'timestampValue',
    /**
     * Indexed as TEXT
     *
     * Used by both File and FileList Fields
     */
    FILE_NAME = 'fileNameValue',
    /**
     * Indexed as KEYWORD
     *
     * Used by both File and FileList Fields
     */
    FILE_EXTENSION = 'fileExtensionValue',
    /**
     * Indexed as TEXT
     *
     * Used by Text, Enumeration, EnumerationMap, Multichoice and MultichoiceMap Fields
     */
    TEXT = 'textValue',
    /**
     * Indexed as KEYWORD
     *
     * Used by EnumerationMap and MultichoiceMap Fields
     */
    KEY = 'keyValue',
    /**
     * Indexed as DOUBLE
     *
     * Used by Number Fields
     */
    NUMBER = 'numberValue',
    /**
     * Indexed as TEXT
     *
     * Used by User and UserListFields
     */
    EMAIL = 'emailValue',
    /**
     * Indexed as TEXT
     *
     * Used by User and UserListFields
     */
    FULL_NAME = 'fullNameValue',
    /**
     * Indexed as LONG
     *
     * Used by User and UserListFields
     */
    USER_ID = 'userIdValue',
}
