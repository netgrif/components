import {Behavior} from './behavior';
import {BehaviorSubject, Observable} from 'rxjs';
import {OnDestroy} from '@angular/core';

export abstract class DataField<T> implements OnDestroy {
    private _changed: BehaviorSubject<T>;

    protected constructor(private _stringId: string, private _title: string, private _behavior: Behavior,
                          private _placeholder?: string, private _description?: string, private _value?: T) {
        this._changed = new BehaviorSubject<T>(this.value);
    }

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

    get behavior(): Behavior {
        return this._behavior;
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }

    get disabled(): boolean {
        return this._behavior.visible && !this._behavior.editable;
    }

    get changed(): Observable<T> {
        return this._changed.asObservable();
    }

    ngOnDestroy(): void {
        this._changed.complete();
    }
}
