import {EventPhase} from '@netgrif/petriflow';
import {EventType} from '../event-type';

export enum ActionType {
  TRANSITION = 'TRANSITION',
  DATA = 'DATA',
  DATAREF = 'DATAREF',
  CASE = 'CASE',
  PROCESS = 'PROCESS',
  ROLE = 'ROLE'
}

export enum ChangeType {
  MOVED,
  REMOVED,
  CREATED,
  EDITED
}

export class EditableAction {

  public changeType: ChangeType;
  public originalEvent: EventType;
  public originalPhase: EventPhase;

  constructor(public id: string, public type: ActionType, public wasCreated: boolean, public definition = '', public event?: EventType, public phase: EventPhase = EventPhase.PRE, public parentDataRefId?: string) {
    this.changeType = undefined;
    if (!wasCreated) {
      this.originalEvent = event;
      this.originalPhase = phase;
    }
  }

  commitChanges(): void {
    this.changeType = undefined;
    this.originalEvent = this.event;
    this.originalPhase = this.phase;
  }
}
