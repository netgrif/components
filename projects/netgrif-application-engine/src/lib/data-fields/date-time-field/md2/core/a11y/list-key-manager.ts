import {QueryList} from '@angular/core';

/**
 * This interface is for items that can be disabled. The type passed into
 * ListKeyManager must extend this interface.
 */
export interface CanDisable {
    disabled?: boolean;
}

/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
export class ListKeyManager<T extends CanDisable> {
    private _activeItemIndex: number = null;
    private _activeItem: T;

    constructor(private _items: QueryList<T>) {
    }

    /**
     * Sets the active item to the item at the index specified.
     *
     * @param index The index of the item to be set as active.
     */
    setActiveItem(index: number): void {
        this._activeItemIndex = index;
        this._activeItem = this._items.toArray()[index];
    }

    /** Returns the currently active item. */
    get activeItem(): T {
        return this._activeItem;
    }
}
