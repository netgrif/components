export abstract class DataField<T> {

    protected constructor(private _stringId: string,private _title: string, private _behavior,
                          private _placeholder?: string, private _description?: string,private _value?: T) {}

    get stringId(): string {
        return this._stringId;
    }

    get title(): string {
        return this._title;
    }

    get placeholder(): string {
        return this._placeholder;
    }

    get description(): string {
        return this._description;
    }

    get behavior(): string {
        return this._behavior;
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }
}
