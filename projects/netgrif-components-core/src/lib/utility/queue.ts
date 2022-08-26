export class Queue<T> {

    private _storage: T[] = [];

    constructor(private _capacity: number = Infinity) {
    }

    enqueue(item: T): void {
        if (this.isFull()) {
            throw Error("Stack has reached max capacity " + this._capacity + ", you cannot add more items")
        }
        this._storage.push(item);
    }

    push(item: T): void {
        this.enqueue(item);
    }

    dequeue(): T | undefined {
        return this._storage.shift();
    }

    pop(): T | undefined {
        return this.dequeue();
    }

    peek(): T | undefined {
        return this.size() > 0 ? this._storage[0] : undefined;
    }

    size(): number {
        return this._storage.length;
    }

    isFull(): boolean {
        return this._capacity === this._storage.length;
    }
}
