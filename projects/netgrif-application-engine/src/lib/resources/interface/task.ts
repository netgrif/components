import {UserTask} from './user-task';
import {DataGroup} from './data-groups';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../panel/task-panel/policy';

export interface Task {
    caseId: string;
    transitionId: string;
    title: string;
    caseColor: string;
    caseTitle: string;
    user: UserTask;
    roles: object;
    startDate: Array<number>;
    assignPolicy: AssignPolicy;
    dataFocusPolicy: DataFocusPolicy;
    finishPolicy: FinishPolicy;
    stringId: string;
    dataGroups: DataGroup[];
    _links: object;
}
