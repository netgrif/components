export interface EventOutcome {
    /**
     * Message associated with triggered event, defined in petri net xml file.
     */
    message?: string;

    /**
     * Array of event outcomes, result of events that were triggered by parent event
     */
    outcomes?: EventOutcome[];
}
