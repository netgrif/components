import {MessageResource} from './message-resource';

// todo spravené pre task, treba refactor podľa backendu
export interface EventOutcome extends MessageResource {

    message: string;

    outcomes: EventOutcome[];
}
