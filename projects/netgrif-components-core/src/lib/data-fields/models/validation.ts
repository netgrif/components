/**
 * Contains field validation information from backend.
 */
export interface Validation {
    /**
     * Value set in the PetriNet model as validation.
     */
    validationRule: string;
    /**
     * Message that should be displayed when the validation fails.
     *
     * If the message is empty, some default message will be displayed.
     */
    validationMessage: string;
}
