import {CaseEventOutcome} from '../../../event/model/event-outcomes/case-outcomes/case-event-outcome';
import {Net} from '../../../process/net';
import {createMockNet} from './create-mock-net';
import {EventOutcome} from '../../../resources/interface/event-outcome';
import {Case} from '../../../resources/interface/case';
import {createMockCase} from './create-mock-case';

/**
 * Creates a mock CaseEventOutcome with given case, net and outcomes attributes.
 *
 * If attributes are not specified, default values are used.
 */
export function createMockCaseOutcome(aCase: Case = createMockCase(), net: Net = createMockNet(), outcomes: Array<EventOutcome> = []) {
    return {
        net,
        outcomes,
        aCase,
        message: 'Mock case event outcome'
    } as CaseEventOutcome;
}
