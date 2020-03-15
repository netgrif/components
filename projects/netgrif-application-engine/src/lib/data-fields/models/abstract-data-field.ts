import {Behaviour} from './behaviour';

export abstract class DataField<T> {

    protected constructor(private _title: string, private _placeholder: string, private _value: T, private _behaviour: Behaviour) {}

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

    get behaviour(): Behaviour {
        return this._behaviour;
    }

    get disabled(): boolean {
        return this._behaviour.visible && !this._behaviour.editable;
    }
}
