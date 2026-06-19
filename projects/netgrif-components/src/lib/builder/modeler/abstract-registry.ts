import {Identifiable} from './edit-mode/domain/identifiable';

export abstract class AbstractRegistry<T extends Identifiable> {

    private _items: Map<string, T>;

    protected constructor() {
        this._items = new Map<string, T>();
    }

    getItems(): Array<T> {
        return Array.from(this._items.values());
    }

    getItem(id: string): T {
        return this._items.get(id);
    }

    registerItem(item: T) {
        const id = item.id;
        if (this._items.has(id)) {
            throw Error(`Item with id ${id} was already registered`);
        }
        this._items.set(item.id, item);
    }
}
