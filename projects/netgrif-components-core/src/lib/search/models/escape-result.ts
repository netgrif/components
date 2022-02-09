/**
 * Result from the [escapeInput()]{@link Operator#escapeInput} function.
 */
export interface EscapeResult {
    /**
     * The escaped value.
     */
    value: string;

    /**
     * Whether some characters had been escaped or not.
     */
    wasEscaped: boolean;
}
