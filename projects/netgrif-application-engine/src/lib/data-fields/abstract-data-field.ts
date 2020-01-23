export abstract class DataField<T> {

    protected constructor(private _title: string, private _placeholder: string, private _value: T) {}

    get title(): string {
        return this._title;
    }

    get placeholder(): string {
        return this._placeholder;
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }
}
