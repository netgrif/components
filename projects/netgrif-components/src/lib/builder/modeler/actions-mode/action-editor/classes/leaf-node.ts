import {CaseEventType, DataEventType, EventPhase, ProcessEventType, TransitionEventType} from '@netgrif/petriflow';
import {BehaviorSubject} from 'rxjs';
import {ActionEditorService} from '../action-editor.service';
import {EventType} from '../event-type';
import {ActionType, EditableAction} from './editable-action';

export interface TreeNode {
  title?: string;
  id?: string;
  children?: Array<TreeNode>;
  actions?: Array<EditableAction>;
  canAdd?: boolean;
  type?: ActionType;
  event?: EventType;
  phase?: EventPhase;
  parent?: TreeNode;
  actionCount: BehaviorSubject<number>;
}

export class LeafNode implements TreeNode {

  public parent = undefined;

  public actionCount: BehaviorSubject<number>;

  public eventType: typeof TransitionEventType | typeof DataEventType | typeof ProcessEventType | typeof CaseEventType;

  constructor(actionType: ActionType, private actionEditorService: ActionEditorService, public actions: Array<EditableAction> = []) {
    this.actionCount = new BehaviorSubject<number>(actions.length);
    switch (actionType) {
      case ActionType.TRANSITION:
        this.eventType = TransitionEventType;
        break;
      case ActionType.DATA:
      case ActionType.DATAREF:
        this.eventType = DataEventType;
        break;
      case ActionType.CASE:
        this.eventType = CaseEventType;
        break;
      case ActionType.PROCESS:
        this.eventType = ProcessEventType;
        break;
    }
  }

  public addAction(type: ActionType, event: EventType, phase: EventPhase): EditableAction {
    const action = new EditableAction(this.actionEditorService.nextId(), type, true, '', event, phase, type === ActionType.DATAREF ? this.parent.parent.parent.id : undefined);
    this.actions.push(action);
    this.incrementCount();
    return action;
  }

  public pushAction(action: EditableAction): void {
    this.actions.push(action);
    this.incrementCount();
  }

  public removeAction(index: number): EditableAction {
    this.decrementCount();
    return this.actions.splice(index, 1)[0];
  }

  public hasDisplayableActions(): boolean {
    return this.actionCount.getValue() > 0;
  }

  private incrementCount(): void {
    this.actionCount.next(this.actionCount.getValue() + 1);
  }

  private decrementCount(): void {
    this.actionCount.next(this.actionCount.getValue() - 1);
  }
}
