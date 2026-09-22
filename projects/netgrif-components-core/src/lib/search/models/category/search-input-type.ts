/**
 * The various input types the search component can display and the search categories can use to generate search predicates.
 */
export enum SearchInputType {
    TEXT = 'text',
    PLAIN_QUERY = 'plain_query',
    AUTOCOMPLETE = 'autocomplete',
    DATE = 'date',
    DATE_TIME = 'dateTime',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    OPERATOR = 'operator',
}
