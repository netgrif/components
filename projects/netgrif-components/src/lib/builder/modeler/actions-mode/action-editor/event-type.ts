import {CaseEventType, DataEventType, ProcessEventType, RoleEventType, TransitionEventType} from '@netgrif/petriflow';

export type EventType = TransitionEventType | DataEventType | CaseEventType | ProcessEventType | RoleEventType;
