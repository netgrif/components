import {Behavior} from './behavior';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Change} from './changed-fields';
import {distinctUntilChanged, filter, take} from 'rxjs/operators';
import {Layout} from './layout';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Component} from './component';
import {Validation} from './validation';

/**
 * Holds the logic common to all data field Model objects.
 * @typeparam T - type of the `value` property of the data field
 */
export abstract class DataField<T> {
    /**
     * @ignore
     * Current value of the data field
     */
    protected _value: BehaviorSubject<T>;
    /**
     * @ignore
     * Previous value of the data field
     */
    protected _previousValue: BehaviorSubject<T>;
    /**
     * @ignore
     * Whether the data field Model object was initialized, we push that info into stream
     *
     * See [registerFormControl()]{@link DataField#registerFormControl} for more information.
     */
    protected _initialized$: BehaviorSubject<boolean>;
    /**
     * @ignore
     * Whether the field fulfills all of it's validators.
     */
    private _valid: boolean;
    /**
     * @ignore
     * Whether the `value` of the field changed recently. The flag is cleared when changes are send to backend.
     */
    private _changed: boolean;
    /**
     * @ignore
     * Data field subscribes this stream.
     * The data field updates it's Validators, validity and enabled/disabled according to it's behavior.
     */
    protected _update: Subject<void>;
    /**
     * @ignore
     * Data field subscribes this stream. When a `true` value is received the data field disables itself.
     * When a `false`value is received data field disables/enables itself based on it's behavior.
     */
    protected _block: Subject<boolean>;
    /**
     * @ignore
     * When a `true` value is there, the data field is disabled.
     * When a `false` value is received, data field is disabled/enabled based on it's behavior.
     */
    protected _blocked: boolean;
    /**
     * @ignore
     * Data field subscribes this stream. Sets the state of the data field to "touched" or "untouched" (`true`/`false`).
     * Validity of the data field is not checked in an "untouched" state.
     * All fields are touched before a task is finished to check their validity.
     */
    protected _touch: Subject<boolean>;
    protected _updateSubscription: Subscription;
    protected _blockSubscription: Subscription;
    protected _touchSubscription: Subscription;
    protected _formControlValueSubscription: Subscription;
    protected _myValueSubscription: Subscription;
    /**
     * @ignore
     * Appearance of dataFields, possible values - outline, standard, fill, legacy
     */
    public materialAppearance: string;
    /**
     * @ignore
     * Whether the field fulfills required validator.
     */
    private _validRequired: boolean;
    /**
     * Whether invalid field values should be sent to backend.
     */
    private _sendInvalidValues = true;
    /**
     * Flag that is set during reverting
     */
    private _reverting = false;

    /**
     * Validators resolved from field validations
     */
    protected _validators: Array<ValidatorFn>;

    /**
     * Stores the last subscription to the [_initialized$]{@link AbstractDataField#_initialized$} Stream, to prevent multiple block events
     * from executing at the same time
     */
    protected _initializedSubscription: Subscription;

    /**
     * @ignore
     * Whether the changes from has been requested. The flag is cleared when changes are received from backend.
     */
    private _waitingForResponse: boolean;

    /**
     * Stores a copy of the fields layout, that can be modified by the layouting algorithm as needed
     * without affecting the base configuration.
     */
    protected _localLayout: Layout;

    /**
     * @param _stringId - ID of the data field from backend
     * @param _title - displayed title of the data field from backend
     * @param initialValue - initial value of the data field
     * @param _behavior - data field behavior
     * @param _placeholder - placeholder displayed in the datafield
     * @param _description - tooltip of the datafield
     * @param _layout - information regarding the component rendering
     * @param validations
     * @param _component - component data of datafield
     * @param _parentTaskId - stringId of parent task, only defined if field is loaded using {@link TaskRefField}
     * @param _parentCaseId - stringId of parent case, only defined if field is loaded using {@link TaskRefField}
     */
    protected constructor(private _stringId: string, private _title: string, initialValue: T,
                          private _behavior: Behavior, private _placeholder?: string,
                          private _description?: string, private _layout?: Layout, public validations?: Array<Validation>,
                          private _component?: Component, private _parentTaskId?: string, private _parentCaseId?: string) {
        this._value = new BehaviorSubject<T>(initialValue);
        this._previousValue = new BehaviorSubject<T>(initialValue);
        this._initialized$ = new BehaviorSubject<boolean>(false);
        this._valid = true;
        this._changed = false;
        this._waitingForResponse = false;
        this._update = new Subject<void>();
        this._block = new Subject<boolean>();
        this._touch = new Subject<boolean>();
        this._validRequired = true;
        this.resetLocalLayout();
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
        if (!this.valueEquality(this._value.getValue(), value) && !this._reverting) {
            this._changed = true;
            this._waitingForResponse = true;
            this.resolvePrevValue(value);
        }
        this._value.next(value);
        this._reverting = false;
    }

    get parentTaskId(): string {
        return this._parentTaskId;
    }

    get parentCaseId(): string {
        return this._parentCaseId;
    }

    get previousValue() {
        return this._previousValue.getValue();
    }

    set previousValue(value: T) {
        this._previousValue.next(value);
    }

    public valueWithoutChange(value: T) {
        this._changed = false;
        this._value.next(value);
    }

    set layout(layout: Layout) {
        this._layout = layout;
    }

    get layout(): Layout {
        return this._layout;
    }

    get localLayout(): Layout {
        return this._localLayout;
    }

    get disabled(): boolean {
        return !!this._behavior.visible && !this._behavior.editable;
    }

    get initialized(): boolean {
        return this._initialized$.value;
    }

    get initialized$(): Observable<boolean> {
        return this._initialized$.asObservable();
    }

    set valid(set: boolean) {
        this._valid = set;
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
        if (this._initializedSubscription !== undefined && !this._initializedSubscription.closed) {
            this._initializedSubscription.unsubscribe();
        }
        this._initializedSubscription = this.initialized$.pipe(filter(i => i), take(1)).subscribe(() => {
            this._block.next(set);
        });
    }

    set touch(set: boolean) {
        this._touch.next(set);
    }

    get component(): Component {
        return this._component;
    }

    public revertToPreviousValue(): void {
        this.changed = false;
        this._reverting = true;
        this.value = this.previousValue;
    }

    set validRequired(set: boolean) {
        this._validRequired = set;
    }

    get validRequired(): boolean {
        return this._validRequired;
    }

    get sendInvalidValues(): boolean {
        return this._sendInvalidValues;
    }

    set sendInvalidValues(value: boolean | null) {
        this._sendInvalidValues = value === null || value;
    }

    get waitingForResponse(): boolean {
        return this._waitingForResponse;
    }

    set waitingForResponse(value: boolean) {
        this._waitingForResponse = value;
    }

    public update(): void {
        this._update.next();
    }

    public valueChanges(): Observable<T> {
        return this._value.asObservable();
    }

    public destroy(): void {
        this._value.complete();
        this._previousValue.complete();
        this._update.complete();
        this._touch.complete();
        this._block.complete();
        this._initialized$.complete();
    }

    public registerFormControl(formControl: FormControl): void {
        if (this.initialized) {
            throw new Error('Data field can be initialized only once!'
                + ' Disconnect the previous form control before initializing the data field again!');
        }

        formControl.setValidators(this.resolveFormControlValidators());

        this._formControlValueSubscription = formControl.valueChanges.pipe(
            distinctUntilChanged(this.valueEquality)
        ).subscribe(newValue => {
            this._valid = this._determineFormControlValidity(formControl);
            this.value = newValue;
        });

        this._myValueSubscription = this._value.pipe(
            distinctUntilChanged(this.valueEquality)
        ).subscribe(newValue => {
            this._valid = this._determineFormControlValidity(formControl);
            formControl.setValue(newValue);
        });

        this.updateFormControlState(formControl);
        this._initialized$.next(true);
        this._changed = false;
        this._waitingForResponse = false;
    }

    public disconnectFormControl(): void {
        if (!this.initialized) {
            return;
        }
        this._initialized$.next(false);
        const subs = [
            this._updateSubscription,
            this._blockSubscription,
            this._touchSubscription,
            this._formControlValueSubscription,
            this._myValueSubscription
        ];
        for (const sub of subs) {
            if (sub) {
                sub.unsubscribe();
            }
        }
    }

    protected updateFormControlState(formControl: FormControl): void {
        formControl.setValue(this.value);
        this.subscribeToInnerSubjects(formControl);
        this.update();
    }

    protected subscribeToInnerSubjects(formControl: FormControl) {
        this._updateSubscription = this._update.subscribe(() => {
            this.validRequired = this.calculateValidity(true, formControl);
            this.valid = this.calculateValidity(false, formControl);
            if (!this._blocked) {
                this.disabled ? formControl.disable() : formControl.enable();
            }
        });

        this._blockSubscription = this._block.subscribe(bool => {
            if (bool) {
                this._blocked = true;
                formControl.disable();
            } else {
                this._blocked = false;
                this.disabled ? formControl.disable() : formControl.enable();
            }
        });

        this._touchSubscription = this._touch.subscribe(bool => {
            if (bool) {
                formControl.markAsTouched();
            } else {
                formControl.markAsUntouched();
            }
        });
    }

    /**
     * Computes whether the FormControl si valid.
     * @param formControl check form control
     */
    protected _determineFormControlValidity(formControl: FormControl): boolean {
        // disabled form controls are marked as invalid as per W3C standard, this solves that problem
        return formControl.disabled || formControl.valid;
    }

    /**
     * Creates Validator objects based on field `behavior`. Only the `required` behavior is resolved by default.
     * Required is resolved as `Validators.required`.
     * If you need to resolve additional Validators or need a different resolution for the `required` Validator override this method.
     *
     * See {@link Behavior} for information about data field behavior.
     *
     * See {@link ValidatorFn} and {@link Validators} for information about Validators.
     *
     * Alternatively see [Form Validation guide]{@link https://angular.io/guide/form-validation#reactive-form-validation} from Angular.
     */
    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(Validators.required);
        }

        if (this.validations) {
            if (this._validators) {
                result.push(...this._validators);
            } else {
                this._validators = this.resolveValidations();
                result.push(...this._validators);
            }
        }

        return result;
    }

    public replaceValidations(validations: Array<Validation>) {
        this.clearValidators();
        this.validations = validations;
    }

    public clearValidators(): void {
        this._validators = null;
    }

    protected resolveValidations(): Array<ValidatorFn> {
        return [];
    }

    /**
     * Determines if two values of the data field are equal.
     *
     * `a === b` equality is used by default. If you want different behavior override this method.
     * @param a - first compared value
     * @param b - second compared value
     */
    protected valueEquality(a: T, b: T): boolean {
        return a === b;
    }

    /**
     * Updates the state of this data field model object.
     * @param change - object describing the changes - returned from backend
     *
     * Also see {@link ChangedFields}.
     */
    public applyChange(change: Change): void {
        Object.keys(change).forEach(changedAttribute => {
            switch (changedAttribute) {
                case 'value':
                    this.value = change[changedAttribute];
                    break;
                case 'behavior':
                    Object.assign(this.behavior, change[changedAttribute]);
                    this.update();
                    break;
                default:
                    throw new Error(`Unknown attribute '${changedAttribute}' in change object`);
            }
        });
    }

    public resolveAppearance(config: ConfigurationService): void {
        let appearance = 'outline';
        if (this.layout && this.layout.appearance) {
            appearance = this.layout.appearance;
        } else {
            const datafieldConfiguration = config.getDatafieldConfiguration();
            if (datafieldConfiguration && datafieldConfiguration.appearance) {
                appearance = datafieldConfiguration.appearance;
            }
        }
        this.materialAppearance = appearance;
    }

    public resolvePrevValue(value: T): void {
        if (this._value.getValue() !== undefined
            && this._value.getValue() !== value) {
            this._previousValue.next(this._value.getValue());
        }
    }

    protected calculateValidity(forValidRequired: boolean, formControl: FormControl): boolean {
        const isDisabled = formControl.disabled;
        if (forValidRequired) {
            formControl.enable();
        }
        formControl.clearValidators();
        if (forValidRequired) {
            formControl.setValidators(this.behavior.required ? [Validators.required] : []);
        } else {
            formControl.setValidators(this.resolveFormControlValidators());
        }
        formControl.updateValueAndValidity();
        const validity = this._determineFormControlValidity(formControl);
        isDisabled ? formControl.disable() : formControl.enable();
        return validity;
    }

    public isInvalid(formControl: FormControl): boolean {
        return !formControl.disabled && !formControl.valid && formControl.touched;
    }

    /**
     * Copies the layout settings into the local layout.
     */
    public resetLocalLayout(): void {
        if (this._layout !== undefined) {
            this._localLayout = {...this._layout};
        } else {
            this._localLayout = undefined;
        }
    }
}
