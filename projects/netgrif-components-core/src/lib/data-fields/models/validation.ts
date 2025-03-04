/**
 * Contains field validation information from backend.
 */
export interface Validation {
    /**
     * Name of the validation.
     *
     * Used to indetificate which validation should be executed
     */
    name: string;
    /**
     * Message that should be displayed when the validation fails.
     *
     * If the message is empty, some default message will be displayed.
     */
    message: string;
    /**
     *
     */
    clientArguments?: Array<string>;
    serverArguments?: Array<string>;
}
