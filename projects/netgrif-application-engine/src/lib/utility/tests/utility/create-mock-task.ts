import {Task} from '../../../resources/interface/task';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../../task-content/model/policy';

/**
 * Creates a mock Task instance with the given attributes.
 *
 * The attributes are filled with mostly empty values, if you want to make a test that uses some of them,
 * we recommend setting them yourself, as the returned object might change between versions.
 */
export function createMockTask(stringId = 'stringId',
                               title = 'taskTitle',
                               transitionId = 'transitionId',
                               cols = 4): Task {
    return {
        caseId: 'string',
        transitionId,
        title,
        caseColor: 'string',
        caseTitle: 'string',
        user: undefined,
        roles: {},
        users: {},
        userRefs: {},
        startDate: undefined,
        finishDate: undefined,
        assignPolicy: AssignPolicy.manual,
        dataFocusPolicy: DataFocusPolicy.manual,
        finishPolicy: FinishPolicy.manual,
        stringId,
        layout: {
            offset: 0,
            rows: 0,
            cols
        },
        dataGroups: [],
        _links: {}
    };
}
