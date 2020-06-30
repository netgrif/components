export interface CaseRefSetDataBody {
    operation: CaseRefOperation;
    title?: string;
    processId?: string;
    caseId?: string;
}

export enum CaseRefOperation {
    ADD = 'add',
    REMOVE = 'remove'
}
