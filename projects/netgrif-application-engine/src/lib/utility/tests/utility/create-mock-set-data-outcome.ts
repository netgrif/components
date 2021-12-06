import {SetDataEventOutcome} from '../../../event/model/event-outcomes/data-outcomes/set-data-event-outcome';
import {Task} from '../../../resources/interface/task';
import {createMockTask} from './create-mock-task';
import {Net} from '../../../process/net';
import {createMockNet} from './create-mock-net';
import {Case} from '../../../resources/interface/case';
import {createMockCase} from './create-mock-case';
import {EventOutcome} from '../../../resources/interface/event-outcome';
import {ChangedFieldContainer} from '../../../resources/interface/changed-field-container';


/**
 * Creates a mock TaskEventOutcome with given changedFields, task, net, case and outcomes attributes.
 *
 * If attributes are not specified, default values are used.
 */
export function createMockSetDataOutcome(changedFields: ChangedFieldContainer = { changedFields: {}}, task: Task = createMockTask(),
                                         net: Net = createMockNet(), aCase: Case = createMockCase(), outcomes: Array<EventOutcome> = []) {
    return {
        net,
        aCase,
        task,
        outcomes,
        message: 'Mock set data event outcome',
        changedFields,
    } as SetDataEventOutcome;
}
