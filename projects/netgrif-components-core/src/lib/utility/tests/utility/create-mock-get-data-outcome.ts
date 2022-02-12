import {GetDataEventOutcome} from '../../../event/model/event-outcomes/data-outcomes/get-data-event-outcome';
import {Task} from '../../../resources/interface/task';
import {createMockTask} from './create-mock-task';
import {Net} from '../../../process/net';
import {createMockNet} from './create-mock-net';
import {Case} from '../../../resources/interface/case';
import {createMockCase} from './create-mock-case';
import {EventOutcome} from '../../../resources/interface/event-outcome';
import {createMockField} from './create-mock-field';
import {DataField} from '../../../data-fields/models/abstract-data-field';

export function createMockGetDataOutcome(data: Array<DataField<any>> = [createMockField()], task: Task = createMockTask(),
                                         net: Net = createMockNet(), aCase: Case = createMockCase(), outcomes: Array<EventOutcome> = []) {
    return {
        net,
        aCase,
        task,
        outcomes,
        message: 'Mock get data event outcome',
        data
    } as GetDataEventOutcome;
}
