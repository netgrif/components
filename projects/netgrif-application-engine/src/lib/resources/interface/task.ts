import {UserTask} from './user-task';

export interface Task {
    caseId: string;
    transitionId: string;
    title: string;
    caseColor: string;
    caseTitle: string;
    user: UserTask;
    roles: object;
    startDate: Array<number>;
    assignPolicy: string;
    dataFocusPolicy: string;
    finishPolicy: string;
    stringId: string;
    _links: object;
}
