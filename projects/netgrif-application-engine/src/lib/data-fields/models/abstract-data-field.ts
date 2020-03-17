import {Behavior} from './behavior';
import {BehaviorSubject, Observable} from 'rxjs';
import {OnDestroy} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Change} from './changed-fields';

export enum MaterialAppearance {
    LEGACY = 'legacy',
    STANDARD = 'standard',
    FILL = 'fill',
    OUTLINE = 'outline'
}

export abstract class DataField<T> {

    protected constructor(private _stringId: string, private _title: string, private _behavior: Behavior,
                          private _placeholder?: string, private _description?: string, private _value?: T) {}

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

    public registerFormControl(formControl: FormControl): void {
        formControl.registerOnChange(() => {
            this.value = formControl.value;
        });
        this.updateFormControlState(formControl);
    }

    public updateFormControlState(formControl: FormControl): void {
        formControl.setValue(this.value);
        this.behavior.editable ? formControl.enable() : formControl.disable();
        formControl.clearValidators();
        formControl.setValidators(this.resolveFormControlValidators());
    }

    private resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(Validators.required);
        }

        // TODO validations

        return result;
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
