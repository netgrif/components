export class MenuItem {
    private _title: string;
    private _icon: string;
    private _onClick: () => void;

    constructor(title: string, icon: string, onClick: () => void) {
        this._title = title;
        this._icon = icon;
        this._onClick = onClick;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get icon(): string {
        return this._icon;
    }

    set icon(value: string) {
        this._icon = value;
    }

    get onClick(): () => void {
        return this._onClick;
    }

    set onClick(value: () => void) {
        this._onClick = value;
    }
}
