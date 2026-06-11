import {MenuItem} from './menu-items/menu-item';

export class ContextMenu {
    private readonly _items: Array<MenuItem>;
    /**
     * [MouseEvent::clientX, MouseEvent::clientY]
     */
    private readonly _position: DOMPoint;

    constructor(items: Array<MenuItem>, position: DOMPoint) {
        this._items = items;
        this._position = position;
    }

    get items(): Array<MenuItem> {
        return this._items;
    }

    get position(): DOMPoint {
        return this._position;
    }
}
