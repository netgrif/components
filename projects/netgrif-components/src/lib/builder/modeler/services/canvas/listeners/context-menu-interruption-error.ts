export class ContextMenuInterruptionError implements Error {
    private _stack?: string;

    constructor() {
    }

    get name(): string {
        return 'ContextMenuInterruptionError';
    }

    get message(): string {
        return 'Context menu closed';
    }

    get stack(): string {
        return this._stack;
    }

    set stack(value: string) {
        this._stack = value;
    }
}
