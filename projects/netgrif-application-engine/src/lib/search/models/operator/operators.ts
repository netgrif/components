/**
 * Represents the available {@link Operator} classes in a serializable form.
 */
export enum Operators {
    EQUALS = 'equals',
    EQUALS_DATE = 'equals_date',
    EQUALS_DATE_TIME = 'equals_date_time',
    IN_RANGE = 'in_range',
    IN_RANGE_DATE = 'in_range_date',
    IN_RANGE_DATE_TIME = 'in_range_date_time',
    IS_NULL = 'is_null',
    LESS_THAN = 'less_than',
    LESS_THAN_DATE = 'less_than_date',
    LESS_THAN_DATE_TIME = 'less_than_date_time',
    LIKE = 'like',
    MORE_THAN = 'more_than',
    MORE_THAN_DATE = 'more_than_date',
    MORE_THAN_DATE_TIME = 'more_than_date_time',
    NOT_EQUALS = 'not_equals',
    NOT_EQUALS_DATE = 'not_equals_date',
    SUBSTRING = 'substring',
}
