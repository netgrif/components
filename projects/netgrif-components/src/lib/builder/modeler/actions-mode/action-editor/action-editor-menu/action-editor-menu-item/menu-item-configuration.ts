import {MenuItem} from './menu-item';

export class MenuItemConfiguration {
    private _title: string;
    private _itemType: string;
    private _keywords: Array<string>;
    private _editor: any;
    private _actionEditor: any;
    private _items: Array<MenuItem>;

    constructor(title: string, itemType: string, keywords: Array<string>, editorObject: any, actionEditor: any, items: Array<MenuItem>) {
        this._title = title;
        this._itemType = itemType;
        this._keywords = keywords;
        this._editor = editorObject;
        this._actionEditor = actionEditor;
        this._items = items;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get itemType(): string {
        return this._itemType;
    }

    set itemType(value: string) {
        this._itemType = value;
    }

    get keywords(): Array<string> {
        return this._keywords;
    }

    set keywords(value: Array<string>) {
        this._keywords = value;
    }

    get editor(): any {
        return this._editor;
    }

    set editor(value: any) {
        this._editor = value;
    }

    get actionEditor(): any {
        return this._actionEditor;
    }

    set actionEditor(value: any) {
        this._actionEditor = value;
    }

    get items(): Array<MenuItem> {
        return this._items;
    }

    set items(value: Array<MenuItem>) {
        this._items = value;
    }
}
