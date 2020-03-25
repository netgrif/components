import {Behavior} from './behavior';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Change} from './changed-fields';
import {distinctUntilChanged} from 'rxjs/operators';

export interface Validation {
    validationRule: string;
    validationMessage: string;
}

export enum MaterialAppearance {
    LEGACY = 'legacy',
    STANDARD = 'standard',
    FILL = 'fill',
    OUTLINE = 'outline'
}

export abstract class DataField<T> {

    private _value$: BehaviorSubject<T>;

    protected constructor(private _stringId: string, private _title: string, initialValue: T,
                          private _behavior: Behavior, private _placeholder?: string, private _description?: string) {
        this._value$ = new BehaviorSubject<T>(initialValue);
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
        return this._value$.getValue();
    }

    set value(value: T) {
        this._value$.next(value);
    }

    get disabled(): boolean {
        return this._behavior.visible && !this._behavior.editable;
    }

    public valueChanges$(): Observable<T> {
        return this._value$.asObservable();
    }

    public registerFormControl(formControl: FormControl): void {
        formControl.valueChanges.pipe(
            distinctUntilChanged(this.valueEquality)
        ).subscribe( newValue => {
            this.value = newValue;
        });
        this._value$.pipe(
            distinctUntilChanged(this.valueEquality)
        ).subscribe( newValue => {
            formControl.setValue(newValue);
        });
        this.updateFormControlState(formControl);
    }

    public updateFormControlState(formControl: FormControl): void {
        formControl.setValue(this.value);
        this.behavior.editable ? formControl.enable() : formControl.disable();
        formControl.clearValidators();
        formControl.setValidators(this.resolveFormControlValidators());
    }

    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(Validators.required);
        }

        return result;
    }

    protected valueEquality(a: T, b: T): boolean {
        return a === b;
    }

    public applyChange(change: Change): void {
        Object.keys(change).forEach(changedAttribute => {
            switch (changedAttribute) {
                case 'value':
                    this.value = change[changedAttribute];
                    break;
                case 'behavior':
                    Object.assign(this.behavior, change[changedAttribute]);
                    break;
                default:
                    throw new Error(`Unknown attribute '${changedAttribute}' in change object`);
            }
        });
    }
}
