import {Injectable} from '@angular/core';
import {
  Action,
  CaseEvent,
  CaseEventType,
  DataEvent,
  DataEventType,
  DataRef,
  DataVariable,
  Event,
  EventPhase,
  PetriNet,
  ProcessEvent,
  ProcessEventType,
  Role,
  RoleEvent,
  RoleEventType,
  Transition,
  TransitionEvent,
  TransitionEventType,
} from '@netgrif/petriflow';
import {ModelService} from '../../services/model/model.service';
import {ActionGroup} from './classes/action-group';
import {ActionType, ChangeType, EditableAction} from './classes/editable-action';
import {MasterItem} from './classes/master-item';
import {EventType} from './event-type';

@Injectable()
export class ActionEditorService {

    public editedActions: Array<ActionGroup>;
    public historySave: boolean;
    private _datarefMap: Map<string, DataRef>;
    private _currentlyEdited: Transition | DataVariable | PetriNet | Role;

    constructor(
        private _modelService: ModelService,
    ) {
        this.editedActions = [];
        this._datarefMap = new Map<string, DataRef>();
    }

    public nextId(): string {
        return this._modelService.nextActionId();
    }

    public populateEditedActionsFromTransition(transition: Transition): void {
        this.editedActions.splice(0, this.editedActions.length);
        this._datarefMap.clear();
        this._currentlyEdited = transition;

        // transition actions
        this.editedActions.push(this.createActionGroup(transition.eventSource.getEvents(), 'Transition', ActionType.TRANSITION));

        // dataref actions
        let combinedDataRefs: Array<DataRef> = [];
        transition.dataGroups.forEach(dataGroup => {
            combinedDataRefs = combinedDataRefs.concat(dataGroup.getDataRefs());
        });

        combinedDataRefs.forEach(dataref => {
            this._datarefMap.set(dataref.id, dataref);
            this.editedActions.push(this.createActionGroup(dataref.getEvents(), dataref.id, ActionType.DATAREF, dataref.id));
        });
    }

    public populateEditedActionsFromDataVariable(dataVariable: DataVariable): void {
        this.editedActions.splice(0, this.editedActions.length);
        this._currentlyEdited = dataVariable;

        this.editedActions.push(this.createActionGroup(dataVariable.getEvents(), dataVariable.title?.value, ActionType.DATA));
    }

    public populateEditedActionsFromRole(role: Role) {
        this.editedActions.splice(0, this.editedActions.length);
        this._datarefMap.clear();
        this._currentlyEdited = role;
        this.editedActions.push(this.createActionGroup(role.getEvents(), 'Role', ActionType.ROLE));
    }

    public populateEditedActionsFromCaseEvents(item: MasterItem): void {
        this.editedActions.splice(0, this.editedActions.length);
        this._currentlyEdited = item.model;

        this.editedActions.push(this.createActionGroup(item.model.getCaseEvents(), 'Case events', ActionType.CASE));
    }

    populateEditedActionsFromProcessEvents(item: MasterItem): void {
        this.editedActions.splice(0, this.editedActions.length);
        this._currentlyEdited = item.model;

        this.editedActions.push(this.createActionGroup(item.model.getProcessEvents(), 'Process events', ActionType.PROCESS));
    }

    private createActionGroup(events: Array<Event<EventType>>, parentName: string, actionType: ActionType, parentDataRefId?: string): ActionGroup {
        return new ActionGroup(actionType, parentName, this.extractActions(events, actionType, parentDataRefId));
    }

    private extractActions(events: Array<Event<EventType>>, actionType: ActionType, parentDataRefId?: string): Array<EditableAction> {
        const result = [];

        events.forEach(event => {
            result.push(...this.extractPhaseActions(event.preActions, actionType, event.type, EventPhase.PRE, parentDataRefId));
            result.push(...this.extractPhaseActions(event.postActions, actionType, event.type, EventPhase.POST, parentDataRefId));
        });

        return result;
    }

    private extractPhaseActions(actions: Array<Action>, actionType: ActionType, eventType: EventType, phase: EventPhase, parentDataRefId?: string): Array<EditableAction> {
        return actions.map(action => this.loadAction(action, actionType, eventType, phase, parentDataRefId));
    }

    private loadAction(action: Action, actionType: ActionType, eventType: EventType, phase: EventPhase, parentDataRefId?: string): EditableAction {
        if (action.id === undefined || action.id === null) {
            action.id = this.nextId();
        }
        return new EditableAction(action.id, actionType, false, action.definition, eventType, phase, parentDataRefId);
    }

    public saveActionChange(changedAction: EditableAction) {
        this.saveAction(changedAction);
        changedAction.commitChanges();
        this.historySave = true;
    }

    private saveAction(changedAction: EditableAction): void {
        let event = this.getEvent(changedAction, changedAction.changeType === ChangeType.MOVED);
        let actions: Array<Action>;
        let action: Action;
        let index: number;
        switch (changedAction.changeType) {
            case ChangeType.EDITED:
                actions = this.getPhaseActions(event, changedAction.phase);
                action = actions.find(it => it.id === changedAction.id);
                action.definition = changedAction.definition;
                return;
            case ChangeType.MOVED:
                actions = this.getPhaseActions(event, changedAction.originalPhase);
                index = actions.findIndex(it => it.id === changedAction.id);
                action = actions.splice(index, 1)[0];

                event = this.getEvent(changedAction, false);
                if (event === undefined) {
                    event = this.addMissingEvent(changedAction);
                }
                actions = this.getPhaseActions(event, changedAction.phase);
                actions.push(action);
                return;
            case ChangeType.CREATED:
                if (event === undefined) {
                    event = this.addMissingEvent(changedAction);
                }
                actions = this.getPhaseActions(event, changedAction.phase);
                actions.push(new Action(changedAction.id, changedAction.definition));
                return;
            case ChangeType.REMOVED:
                actions = this.getPhaseActions(event, changedAction.phase);
                index = actions.findIndex(it => it.id === changedAction.id);
                actions.splice(index, 1);
                return;
        }
    }

    private addMissingEvent(changedAction: EditableAction): Event<EventType> {
        let event: Event<EventType>;
        const id = changedAction.type === ActionType.DATAREF ? changedAction.parentDataRefId : this._currentlyEdited.id;
        const eventId = `${id}_${changedAction.event}`;
        switch (changedAction.type) {
            case ActionType.CASE:
                event = new CaseEvent(changedAction.event as CaseEventType, eventId);
                break;
            case ActionType.PROCESS:
                event = new ProcessEvent(changedAction.event as ProcessEventType, eventId);
                break;
            case ActionType.TRANSITION:
                event = new TransitionEvent(changedAction.event as TransitionEventType, eventId);
                break;
            case ActionType.DATA:
            case ActionType.DATAREF:
                event = new DataEvent(changedAction.event as DataEventType, eventId);
                break;
            case ActionType.ROLE:
                event = new RoleEvent(changedAction.event as RoleEventType, eventId);
                break;
        }
        switch (changedAction.type) {
            case ActionType.CASE:
                (this._currentlyEdited as PetriNet).addCaseEvent(event as CaseEvent);
                break;
            case ActionType.PROCESS:
                (this._currentlyEdited as PetriNet).addProcessEvent(event as ProcessEvent);
                break;
            case ActionType.TRANSITION:
                (this._currentlyEdited as Transition).eventSource.addEvent(event as TransitionEvent);
                break;
            case ActionType.DATA:
                (this._currentlyEdited as DataVariable).addEvent(event as DataEvent);
                break;
            case ActionType.DATAREF:
                this.getDataRef(changedAction.parentDataRefId).addEvent(event as DataEvent);
                break;
            case ActionType.ROLE:
                (this._currentlyEdited as Role).addEvent(event as RoleEvent);
                break;
        }
        return event;
    }

    private getEvent(changedAction: EditableAction, getOriginal: boolean): Event<EventType> {
        const event = getOriginal ? changedAction.originalEvent : changedAction.event;
        switch (changedAction.type) {
            case ActionType.CASE:
                return (this._currentlyEdited as PetriNet).getCaseEvent(event as CaseEventType);
            case ActionType.PROCESS:
                return (this._currentlyEdited as PetriNet).getProcessEvent(event as ProcessEventType);
            case ActionType.TRANSITION:
                return (this._currentlyEdited as Transition).eventSource.getEvent(event as TransitionEventType);
            case ActionType.DATA:
                return (this._currentlyEdited as DataVariable).getEvent(event as DataEventType);
            case ActionType.DATAREF:
                return this.getDataRef(changedAction.parentDataRefId).getEvent(event as DataEventType);
            case ActionType.ROLE:
                return (this._currentlyEdited as Role).getEvent(event as RoleEventType);
        }
    }

    private getPhaseActions(event: Event<unknown>, phase: EventPhase): Array<Action> {
        if (phase === EventPhase.PRE) {
            return event.preActions;
        } else {
            return event.postActions;
        }
    }

    private getDataRef(datarefId: string): DataRef {
        for (const dataGroup of (this._currentlyEdited as Transition).dataGroups) {
            const dataRef = dataGroup.getDataRef(datarefId);
            if (dataRef !== undefined) {
                return dataRef;
            }
        }
        return undefined;
    }
}
