export class Hotkey {
    private readonly _key: string;
    private readonly _ctrl: boolean;
    private readonly _alt: boolean;
    private readonly _shift: boolean;
    private readonly _listener: () => void;

    constructor(key: string, ctrl: boolean, alt: boolean, shift: boolean, listener: () => void) {
        this._key = key;
        this._ctrl = ctrl;
        this._alt = alt;
        this._shift = shift;
        this._listener = listener;
    }

    public matches(event: KeyboardEvent): boolean {
        return (this.ctrl ? (event.ctrlKey || event.metaKey) : true)
            && (this.alt ? event.altKey : true)
            && (this.shift ? event.shiftKey : true)
            && (this.key.toLowerCase() === event.key?.toLowerCase());
    }

    get ctrl(): boolean {
        return this._ctrl;
    }

    get alt(): boolean {
        return this._alt;
    }

    get shift(): boolean {
        return this._shift;
    }

    get key(): string {
        return this._key;
    }

    get listener(): () => void {
        return this._listener;
    }

    public toString(): string {
        const parts = new Array<string>();
        if (this.ctrl) {
            parts.push('ctrl');
        }
        if (this.shift) {
            parts.push('shift');
        }
        if (this.alt) {
            parts.push('alt');
        }
        parts.push(this.key);
        return parts.join('+');
    }
}
