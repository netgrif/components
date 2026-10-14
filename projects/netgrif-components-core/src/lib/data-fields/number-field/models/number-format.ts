/**
 * Configuration of the custom number format used by the `formatted` component of a number field.
 */
export interface NumberFormat {
    /**
     * Literal used to separate the integer part of the number from its decimal digits
     */
    decimalSeparator?: string;
    /**
     * Literal used to separate groups (thousands) of the integer part of the number
     */
    groupSeparator?: string;
    /**
     * Decimal representation options in the same format as for the angular `DecimalPipe`:
     * `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`
     */
    digitsInfo?: string;
}

/**
 * Default number format used when neither the field component properties nor the `nae.json` configuration
 * (`services.dataFields.defaultNumberFormat`) define the format attributes.
 */
export const DEFAULT_NUMBER_FORMAT: Required<NumberFormat> = {
    decimalSeparator: '.',
    groupSeparator: ' ',
    digitsInfo: '1.2-2'
};
