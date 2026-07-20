import {Tool} from './tool';

export class ToolGroup<T extends Tool> {
    private _tools: Array<T>;

    constructor(...tools: Array<T>) {
        this._tools = tools;
    }

    get tools(): Array<T> {
        return this._tools;
    }

    set tools(value: Array<T>) {
        this._tools = value;
    }
}
