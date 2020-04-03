import {Behavior} from './behavior';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Change} from './changed-fields';
import {distinctUntilChanged} from 'rxjs/operators';

export interface Validation {
    validationRule: string;
    validationMessage: string;
}

export interface Layout {
    x: number;
    y: number;
    cols: number;
    rows: number;
    template: TemplateAppearance;
    appearance: MaterialAppearance;
}

export enum TemplateAppearance {
    MATERIAL = 'material',
    NETGRIF = 'netgrif',
}

export enum MaterialAppearance {
    LEGACY = 'legacy',
    STANDARD = 'standard',
    FILL = 'fill',
    OUTLINE = 'outline'
}

export abstract class DataField<T> {
    private _value: BehaviorSubject<T>;
    private _initialized: boolean;
    private _valid: boolean;
    private _changed: boolean;
    private _update: Subject<void>;
    private _block: Subject<boolean>;

    protected constructor(private _stringId: string, private _title: string, initialValue: T,
                          private _behavior: Behavior, private _placeholder?: string,
                          private _description?: string, private _layout?: Layout) {
        this._value = new BehaviorSubject<T>(initialValue);
        this._initialized = false;
        this._valid = true;
        this._changed = false;
        this._update = new Subject<void>();
        this._block = new Subject<boolean>();
    }

    get stringId(): string {
        return this._stringId;
    }

    set title(title: string) {
        this._title = title;
    }

    get title(): string {
        return this._title;
    }

    set placeholder(placeholder: string) {
        this._placeholder = placeholder;
    }

    get placeholder(): string {
        return this._placeholder;
    }

    set description(desc: string) {
        this._description = desc;
    }

    get description(): string {
        return this._description;
    }

    set behavior(behavior: Behavior) {
        this._behavior = behavior;
    }

    get behavior(): Behavior {
        return this._behavior;
    }

    get value(): T {
        return this._value.getValue();
    }

    set value(value: T) {
        if (!this.valueEquality(this._value.getValue(), value)) {
            this._changed = true;
        }
        this._value.next(value);
    }

    set layout(layout: Layout) {
        this._layout = layout;
    }

    get layout(): Layout {
        return this._layout;
    }

    get disabled(): boolean {
        return this._behavior.visible && !this._behavior.editable;
    }

    get initialized(): boolean {
        return this._initialized;
    }

    get valid(): boolean {
        return this._valid;
    }

    set changed(set: boolean) {
        this._changed = set;
    }

    get changed(): boolean {
        return this._changed;
    }

    set block(set: boolean) {
        this._block.next(set);
    }

    public update(): void {
        this._update.next();
    }

    public valueChanges(): Observable<T> {
        return this._value.asObservable();
    }

    public registerFormControl(formControl: FormControl): void {
        formControl.valueChanges.pipe(
            distinctUntilChanged(this.valueEquality)
        ).subscribe(newValue => {
            this._valid = formControl.valid;
            this.value = newValue;
        });
        this._value.pipe(
            distinctUntilChanged(this.valueEquality)
        ).subscribe(newValue => {
            this._valid = formControl.valid;
            formControl.setValue(newValue);
        });
        this.updateFormControlState(formControl);
        this._initialized = true;
        this._changed = false;
    }

    public updateFormControlState(formControl: FormControl): void {
        this._update.subscribe(() => {
            this.disabled ? formControl.disable() : formControl.enable();
            formControl.clearValidators();
            formControl.setValidators(this.resolveFormControlValidators());
            this._valid = formControl.valid;
        });
        this._block.subscribe(bool => {
            if (bool) {
                formControl.disable();
            } else {
                this.disabled ? formControl.disable() : formControl.enable();
            }
        });
        this.update();
        formControl.setValue(this.value);
        this._valid = formControl.valid;
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
