/**
 * Result from the [wrapInputWithQuotes()]{@link Operator#wrapInputWithQuotes} function.
 */
export interface WrapResult {
    /**
     * The value wrapped with double quotes `"`
     */
    value: string;

    /**
     * Whether the value was wrapped or not
     */
    wasWrapped: boolean;
}
