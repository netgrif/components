import {BehaviorSubject} from 'rxjs';
import {Tool} from '../../tools/tool';
import {ToolGroup} from '../../tools/tool-group';
import {Mode} from '../mode';

export abstract class ModeService<T extends Tool> {

    private _mode: Mode;
    private _tools: Array<ToolGroup<T>>;
    private _activeTool: BehaviorSubject<T>;
    private _defaultTool: T;

    isActive(tool: T) {
        if (!this._activeTool) {
            return false;
        }
        return this.activeTool.id === tool.id;
    }

    activate(tool?: T) {
        if (tool === undefined) {
            this._activeTool.next(this._defaultTool);
        } else {
            this._activeTool.next(tool);
        }
    }

    get mode(): Mode {
        return this._mode;
    }

    set mode(value: Mode) {
        this._mode = value;
    }

    get tools(): Array<ToolGroup<T>> {
        return this._tools;
    }

    set tools(value: Array<ToolGroup<T>>) {
        this._tools = value;
        this._defaultTool = this._tools?.slice(0, 1)?.pop()?.tools?.slice(0, 1)?.pop();
        this._activeTool = new BehaviorSubject<T>(this._defaultTool);
    }

    get activeTool(): T {
        return this._activeTool.value;
    }

    get activeToolSubject(): BehaviorSubject<T> {
        return this._activeTool;
    }

    get defaultTool(): T {
        return this._defaultTool;
    }

    set defaultTool(value: T) {
        this._defaultTool = value;
    }
}
