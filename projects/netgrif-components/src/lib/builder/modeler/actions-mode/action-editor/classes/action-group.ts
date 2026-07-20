import {ActionType, EditableAction} from './editable-action';

export class ActionGroup {

  constructor(public actionsType: ActionType, public parentName: string, public editableActions: Array<EditableAction> = []) {
  }

}
