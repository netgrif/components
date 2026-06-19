import {Injectable} from '@angular/core';
import {
  CaseEventType,
  DataEventType,
  EventPhase,
  ProcessEventType,
  RoleEventType,
  TransitionEventType,
} from '@netgrif/petriflow';
import {BehaviorSubject} from 'rxjs';
import {ActionEditorService} from './action-editor.service';
import {ActionGroup} from './classes/action-group';
import {ActionType, EditableAction} from './classes/editable-action';
import {LeafNode, TreeNode} from './classes/leaf-node';
import {EventType} from './event-type';

@Injectable()
export class ActionEditorTreeService {

  constructor(private actionEditorService: ActionEditorService) {
  }

  private static subscribeToChildStreams(parent: TreeNode): void {
    parent.actionCount = new BehaviorSubject<number>(parent.children.reduce((accumulator: number, current: TreeNode) => accumulator + current.actionCount.getValue(), 0));
    parent.children.forEach(child => {
      child.actionCount.subscribe(newCount => parent.actionCount.next(parent.children.reduce((accumulator: number, current: TreeNode) => accumulator + current.actionCount.getValue(), 0)));
    });
  }

  public createTransitionTreeStructure(actionGroups: Array<ActionGroup>, collapseCallback: (leaf: TreeNode, actionCount: number) => void): Array<TreeNode> {
    const transitionActionGroup = actionGroups.find(it => it.actionsType === ActionType.TRANSITION);
    const transitionNode = {
      title: 'Events',
      type: ActionType.TRANSITION,
      actionCount: null,
      children: this.separateActionsByType(ActionType.TRANSITION, TransitionEventType, transitionActionGroup.editableActions, collapseCallback),
    };
    this.registerChildren(transitionNode, collapseCallback);

    const tree: Array<TreeNode> = [transitionNode];
    actionGroups.filter(it => it.actionsType !== ActionType.TRANSITION).forEach(group => {
      const datarefNode = {
        title: `Dataref ${group.parentName}`,
        id: group.parentName,
        type: ActionType.DATAREF,
        actionCount: null,
        children: this.createDatafieldTreeStructure(group.editableActions, collapseCallback, ActionType.DATAREF),
      };

      this.registerChildren(datarefNode, collapseCallback);

      tree.push(datarefNode);
    });

    return tree;
  }

  createRoleTreeStructure(actions: Array<EditableAction>, collapseCallback: (leaf: TreeNode, actionCount: number) => void): Array<TreeNode> {
    return this.separateActionsByType(ActionType.ROLE, RoleEventType, actions, collapseCallback);
  }

  public createDatafieldTreeStructure(actions: Array<EditableAction>, collapseCallback: (leaf: TreeNode, actionCount: number) => void, type: ActionType = ActionType.DATA): Array<TreeNode> {
    return this.separateActionsByType(type, DataEventType, actions, collapseCallback);
  }

  public createCaseTreeStructure(actions: Array<EditableAction>, type: ActionType, collapseCallback: (leaf: TreeNode, actionCount: number) => void): Array<TreeNode> {
    if (type === ActionType.CASE) {
      return this.separateActionsByType(ActionType.CASE, CaseEventType, actions, collapseCallback);
    }
    return this.separateActionsByType(ActionType.PROCESS, ProcessEventType, actions, collapseCallback);
  }

  private separateActionsByType(actionType: ActionType,
                                type: any, // class EventType
                                actions: Array<EditableAction>,
                                collapseCallback: (leaf: TreeNode, actionCount: number) => void): Array<TreeNode> {
    const indices = new Map<EventType, number>();
    const groups: Array<Array<EditableAction>> = [];
    Object.values(type).forEach((val: EventType, i: number) => {
      indices.set(val, i * 2);
      groups.push([], []);
    });

    actions.forEach(action => {
      groups[(indices.get(action.event) + (action.phase === EventPhase.PRE ? 0 : 1))].push(action);
    });

    const result: Array<TreeNode> = [];
    for (const event of indices.keys()) {
      result.push({
        title: this.convertToTitle(event),
        id: event,
        type: actionType,
        parent: undefined,
        actionCount: null,
        children: this.createPreAndPostActions(actionType, collapseCallback, groups[indices.get(event)], groups[indices.get(event) + 1], event as TransitionEventType),
      });
    }

    result.forEach(node => {
      this.registerChildren(node, collapseCallback);
    });

    return result;
  }

  private createPreAndPostActions(type: ActionType, collapseCallback: (leaf: TreeNode, actionCount: number) => void, preActions: Array<EditableAction>, postActions: Array<EditableAction>, event: EventType): Array<TreeNode> {
    const child1 = new LeafNode(type, this.actionEditorService, preActions);
    const child2 = new LeafNode(type, this.actionEditorService, postActions);
    const subtree: Array<TreeNode> = [
      {
        title: this.convertToTitle(EventPhase.PRE),
        id: EventPhase.PRE,
        canAdd: true,
        type,
        event,
        phase: EventPhase.PRE,
        parent: undefined,
        actionCount: null,
        children: [
          child1,
        ],
      },
      {
        title: this.convertToTitle(EventPhase.POST),
        id: EventPhase.POST,
        canAdd: true,
        type,
        event,
        phase: EventPhase.POST,
        parent: undefined,
        actionCount: null,
        children: [
          child2,
        ],
      },
    ];

    this.registerChildren(subtree[0], collapseCallback);
    this.registerChildren(subtree[1], collapseCallback);

    return subtree;
  }

  private registerChildren(parent: TreeNode, collapseCallback: (leaf: TreeNode, actionCount: number) => void): void {
    parent.children.forEach(child => {
      child.parent = parent;
      child.actionCount.subscribe(count => {
        collapseCallback(child, count);
      });
      ActionEditorTreeService.subscribeToChildStreams(parent);
    });
  }

  private convertToTitle(enumValue: EventType | EventPhase): string {
    return enumValue[0].toUpperCase() + enumValue.substring(1).toLowerCase();
  }
}
