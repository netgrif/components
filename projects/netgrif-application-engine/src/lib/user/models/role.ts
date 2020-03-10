import {ActionType} from "./action-type";

export default interface Role {
    stringId: string;
    title: string;
    name: string;
    actions?: Map<ActionType, boolean>
}
