import {HistoryChange} from './history-change';

export class History<T> {
    private _memory: Array<HistoryChange<T>>;
    private _head: number;
    private readonly limit: number;

    constructor(limit: number = 100) {
        this._memory = new Array<HistoryChange<T>>();
        this.limit = limit;
        this._head = -1;
    }

    public get record(): T {
        return this._memory[this._head]?.record;
    }

    public push(record: T, message: string): HistoryChange<T> {
        if (this.isUpToDate()) {
            if (this.isFull()) {
                this._memory.shift();
            }
        } else {
            this._memory = this._memory.slice(0, this._head + 1);
        }
        const update = new HistoryChange<T>(record, this.size, this.size + 1, message);
        this._memory.push(update);
        this._head = this.size - 1;
        return update;
    }

    public undo(): T | undefined {
        if (this._head === 0) {
            return undefined;
        }
        this._head--;
        return this.record;
    }

    public redo(): T | undefined {
        if (this._head === this._memory.length - 1) {
            return undefined;
        }
        this._head++;
        return this.record;
    }

    public isFull(): boolean {
        return this.size === this.limit;
    }

    public isUpToDate(): boolean {
        return this._head === this.size - 1;
    }

    public get size(): number {
        return this._memory.length;
    }

    public get head(): number {
        return this._head;
    }

    set head(value: number) {
        this._head = value;
    }

    get memory(): Array<HistoryChange<T>> {
        return this._memory;
    }
}
