export interface CreateCaseRequestBody {
    /**
     * Title of the new case
     */
    title: string | null;
    /**
     * StringId of the process from which the new case should be created
     */
    netId: string;
    color?: string;
}
