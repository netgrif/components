import {TaskEventOutcome} from '../../../event/model/event-outcomes/task-outcomes/task-event-outcome';
import {Net} from '../../../process/net';
import {createMockNet} from './create-mock-net';
import {Case} from '../../../resources/interface/case';
import {createMockCase} from './create-mock-case';
import {EventOutcome} from '../../../resources/interface/event-outcome';
import {createMockTask} from './create-mock-task';
import {Task} from '../../../resources/interface/task';

/**
 * Creates a mock TaskEventOutcome with given task, net, case and outcomes attributes.
 *
 * If attributes are not specified, default values are used.
 */
export function createMockTaskOutcome(task: Task = createMockTask(), net: Net = createMockNet(),
                                      aCase: Case = createMockCase(), outcomes: EventOutcome[] = []) {
    return {
        outcomes,
        task,
        aCase,
        net,
        message: 'Mock case event outcome'
    } as TaskEventOutcome;
}
