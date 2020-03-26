import {UserTask} from './user-task';
import {DataGroup} from './data-groups';

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
    dataGroups: DataGroup[];
    _links: object;
}
