import {Observable, Subject} from 'rxjs';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {FileUploadMIMEType} from '../../file-field/models/file-field';
import {DataField} from '../../models/abstract-data-field';
import {FileListFieldValue} from './file-list-field-value';
import {Validation} from '../../models/validation';
import {Component} from '../../models/component';
import {FormControl} from '@angular/forms';
import {ChangedFieldsMap} from '../../../event/services/interfaces/changed-fields-map';
import {distinctUntilChanged} from 'rxjs/operators';

export enum FileListFieldValidation {
    MAX_FILES = 'maxFiles'
}

export class FileListField extends DataField<FileListFieldValue> {
    /**
     * Used to forward the result of the upload file backend call to the task content
     */
    private _changedFields$: Subject<ChangedFieldsMap>;
    public downloaded: Array<string>;

    set value(value: FileListFieldValue) {
        if (!this.valueEquality(this._value.getValue(), value) && !this.reverting) {
            this.changed = true;
            this.waitingForResponse = true;
            this.resolvePrevValue(value ?? {namesPaths: []});
        }
        this._value.next(value ?? {namesPaths: []});
        this.reverting = false;
    }

    get value(): FileListFieldValue {
        return this._value.getValue();
    }

    public valueWithoutChange(value: FileListFieldValue) {
        this.changed = false;
        this._value.next(value ?? {namesPaths: []});
    }

    /**
     * Create new instance for file field with all his properties.
     *
     * Placeholder is a substitute for the value name if not set value.
     */
    constructor(stringId: string, title: string, behavior: Behavior, value?: FileListFieldValue, placeholder?: string, description?: string,
                layout?: Layout, validations?: Array<Validation>, private _maxUploadSizeInBytes?: number,
                private _allowTypes?: string | FileUploadMIMEType | Array<FileUploadMIMEType>,
                component?: Component, parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
        this._changedFields$ = new Subject<ChangedFieldsMap>();
        this.downloaded = new Array<string>();
    }

    get maxUploadSizeInBytes(): number {
        return this._maxUploadSizeInBytes;
    }

    get allowTypes(): string {
        return this._allowTypes instanceof Array ? this._allowTypes.toString() : this._allowTypes;
    }

    get changedFields$(): Observable<ChangedFieldsMap> {
        return this._changedFields$.asObservable();
    }

    public emitChangedFields(change: ChangedFieldsMap): void {
        this._changedFields$.next(change);
    }

    /**
     * We assume that files are always given in the same order.
     */
    protected valueEquality(a: FileListFieldValue, b: FileListFieldValue): boolean {
        let array = (JSON.stringify(a) === '{}' || !a.namesPaths || a.namesPaths.length === 0) &&
            (JSON.stringify(b) === '{}' || !b.namesPaths || b.namesPaths.length === 0);
        if (a && a.namesPaths && a.namesPaths.length !== 0 && b && b.namesPaths && b.namesPaths.length !== 0) {
            array = a.namesPaths.every((element, index) => element.name === b.namesPaths[index].name);
        }
        return (!a && !b) || (!!a && !!b && array);
    }

    public registerFormControl(formControl: FormControl): void {
        if (this.initialized) {
            throw new Error('Data field can be initialized only once!'
                + ' Disconnect the previous form control before initializing the data field again!');
        }

        formControl.setValidators(this.resolveFormControlValidators());

        this._myValueSubscription = this._value.pipe(
            distinctUntilChanged(this.valueEquality)
        ).subscribe(newValue => {
            this.valid = this._determineFormControlValidity(formControl);
            formControl.setValue(!newValue || !newValue.namesPaths ? '' : newValue.namesPaths.map(namePath => {
                return namePath.name;
            }).join('/'));
            this.update();
        });

        this.updateFormControlState(formControl);
        this._initialized$.next(true);
        this.changed = false;
        this.waitingForResponse = false;
    }

    protected updateFormControlState(formControl: FormControl): void {
        this.subscribeToInnerSubjects(formControl);
        this.update();
    }
}
