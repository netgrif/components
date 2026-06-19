import {Action, DataVariable, Element, Role} from '@netgrif/petriflow';

export class SequenceGenerator {
    private _id = 0;
    private readonly _prefix: string;

    constructor(prefix: string) {
        this._prefix = prefix;
    }

    public next(): string {
        this._id++;
        return `${this._prefix}${this._id}`;
    }

    public reset(collection: Array<Element | DataVariable | Role | Action>): void {
        this._id = collection.filter(e => e.id.startsWith(this._prefix))
            .map(e => Number.parseInt(e.id.substring(this._prefix.length), 10))
            .filter(elementId => !isNaN(elementId))
            .reduce((a, b) => Math.max(a, b), 0);
    }
}
