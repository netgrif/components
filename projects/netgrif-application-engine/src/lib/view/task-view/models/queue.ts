import {Subject} from 'rxjs';

export class Queue<T> {
    _store: T[] = [];
    push(val: T) {
        this._store.push(val);
    }
    pop(): T | undefined {
        return this._store.shift();
    }
    isEmpty(): boolean {
        return this._store.length === 0;
    }
}

export class SubjectQueue extends Queue<Subject<void>> {
    removeCompleted(): void {
        if (this.isEmpty()) {
            return;
        }
        for (let i = this._store.length - 1; i >= 0; i--) {
            if (this._store[i].closed) {
                this._store.splice(i, 1);
            }
        }
    }
}
