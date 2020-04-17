import {UserTask} from './user-task';
import {DataGroup} from './data-groups';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../panel/task-panel/policy';
import {TaskLayout} from './task-layout';

export interface Task {
    caseId: string;
    transitionId: string;
    title: string;
    caseColor: string;
    caseTitle: string;
    user: UserTask;
    roles: object;
    startDate: Array<number>;
    finishDate: Array<number>;
    assignPolicy: AssignPolicy;
    dataFocusPolicy: DataFocusPolicy;
    finishPolicy: FinishPolicy;
    stringId: string;
    layout: TaskLayout;
    dataGroups: DataGroup[];
    _links: object;
    dataSize?: number;
    icon?: string;
    priority?: number;
}
