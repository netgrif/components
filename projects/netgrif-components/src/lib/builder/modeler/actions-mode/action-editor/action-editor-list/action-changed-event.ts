import {EditableAction} from "../classes/editable-action";

export interface ActionChangedEvent {
    triggerPath?: Array<string>;
    action: EditableAction;
}
