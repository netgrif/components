export abstract class DataField<T> {

    private _value: T;
    private _title: string;
    private _placeholder: string;

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get placeholder(): string {
        return this._placeholder;
    }

    set placeholder(value: string) {
        this._placeholder = value;
    }
}
