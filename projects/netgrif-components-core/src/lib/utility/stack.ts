export class Stack<T> {
    private _storage: T[] = [];

    constructor(private _capacity: number = Infinity) {
    }

    push(item: T): void {
        if (this.isFull()) {
            throw Error("Stack has reached max capacity " + this._capacity + ", you cannot add more items")
        }
        this._storage.push(item);
    }

    pop(): T | undefined {
        return this._storage.pop();
    }

    peek(): T | undefined {
        return this.size() > 0 ? this._storage[this._storage.length - 1] : undefined;
    }

    size(): number {
        return this._storage.length;
    }

    isFull(): boolean {
        return this._capacity === this.size();
    }
}
