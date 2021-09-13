import {EnumerationField, EnumerationFieldValue, EnumerationFieldView} from './enumeration-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {FieldTypeResource} from '../../../task-content/model/field-type-resource';
import {Component} from '../../models/component';
import {ValidatorFn, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {LoadingEmitter} from '../../../utility/loading-emitter';
import {Validation} from '../../models/validation';

export class DynamicEnumerationField extends EnumerationField {
    protected REQUEST_DEBOUNCE_TIME = 350;
    protected _choicesChange$: Subject<void>;
    protected _loading: LoadingEmitter;

    constructor(stringId: string, title: string, value: string,
                protected _choices: Array<EnumerationFieldValue>, behavior: Behavior, placeholder?: string, description?: string,
                layout?: Layout, protected _view = EnumerationFieldView.DEFAULT,
                protected readonly _fieldType = FieldTypeResource.ENUMERATION,
                validations?: Validation[], component?: Component, parentTaskId?: string) {
        super(stringId, title, value, _choices, behavior, placeholder, description, layout,
            _view, _fieldType, validations, component, parentTaskId);
        this._choicesChange$ = new Subject<void>();
        this._loading = new LoadingEmitter();
    }

    set choices(choices: Array<EnumerationFieldValue>) {
        this._choices = choices;
        this._choicesChange$.next();
    }

    get choices(): Array<EnumerationFieldValue> {
        return this._choices;
    }

    set loading(bool: boolean) {
        bool ? this._loading.on() : this._loading.off();
    }

    get loading() {
        return this._loading.isActive;
    }

    get choicesChange$() {
        return this._choicesChange$.asObservable();
    }

    public valueChanges(): Observable<string> {
        return this._value.pipe(debounceTime(this.REQUEST_DEBOUNCE_TIME));
    }

    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(Validators.required);
        }

        return result;
    }
}
