/**
 * Represents a segment of the extracted filter text
 */
export interface FilterTextSegment {
    /**
     * The text content
     *
     * Should be passed through the translate pipe
     */
    segment: string;
    /**
     * Whether the segment should be displayed in bold font face
     */
    bold?: boolean;
    /**
     * Whether the segment should be displayed with uppercase letters
     */
    uppercase?: boolean;
}
