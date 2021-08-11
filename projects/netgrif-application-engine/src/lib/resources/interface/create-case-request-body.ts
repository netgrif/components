export interface CreateCaseRequestBody {
    /**
     * Title of the new case
     */
    title: string;
    /**
     * StringId of the process from which the new case should be created
     */
    netId: string;
    color?: string;
}
