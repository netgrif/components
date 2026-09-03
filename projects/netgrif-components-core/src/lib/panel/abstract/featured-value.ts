
/**
 * Represents a value featured on a panel
 */
export interface FeaturedValue {
    value: string;
    icon: string;
    type: string;
    /**
     * The main purpose is to determine whether to display filter by text segments or by plain text. This property can be
     * used also for other situations where a decision between pretty or raw output is needed
     */
    pretty?: boolean;
}
