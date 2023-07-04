import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {FileFieldValue} from './file-field-value';
import {Observable, Subject} from 'rxjs';
import {Component, ComponentPrefixes} from '../../models/component';
import {FormControl} from '@angular/forms';
import {Validation} from '../../models/validation';
import {ChangedFieldsMap} from '../../../event/services/interfaces/changed-fields-map';
import {distinctUntilChanged} from 'rxjs/operators';

/**
 * Supported types of files a user can select through a file picker.
 */
export enum FileUploadMIMEType {
    IMAGE = 'image/*',
    VIDEO = 'video/*',
    AUDIO = 'audio/*',
    PDF = '.pdf',
    JPG = '.jpg',
    XML = '.xml',
    DOC_DOCX = '.doc,.docx',
    XLS_XLSX = '.xls,.xlsx'
}

/**
 * Supported types for file preview
 */
export enum FilePreviewType {
    pdf,
    jpg,
    jpeg,
    png
}

/**
 * Extended structure for file by name and extension.
 */
export interface FileUploadDataModel {
    file: File;
    name: string;
    extension: string;
}

/**
 * Holds information represent file field implements in Petri Net
 */
export class FileField extends DataField<FileFieldValue> {
    /**
     * Specifies the size of all uploaded files in bytes.
     *
     * It is an indicator for checking the oversized size in the Petri Net.
     */
    public filesSize = 0;

    /**
     * Used to forward the result of the upload file backend call to the task content
     */
    private _changedFields$: Subject<ChangedFieldsMap>;

    public downloaded: boolean;

    set value(value: FileFieldValue) {
        if (!this.valueEquality(this._value.getValue(), value) && !this.reverting) {
            this.changed = true;
            this.waitingForResponse = true;
            this.resolvePrevValue(value ?? {});
        }
        this._value.next(value ?? {});
        this.reverting = false;
    }

    get value(): FileFieldValue {
        return this._value.getValue();
    }

    get updated(): Observable<void> {
        return this._update.asObservable();
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.FILE + this.getComponentType();
    }

    public valueWithoutChange(value: FileFieldValue) {
        this.changed = false;
        this._value.next(value ?? {});
    }

    /**
     * Create new instance for file field with all his properties.
     *
     * Placeholder is a substitute for the value name if not set value.
     */
    constructor(stringId: string, title: string, behavior: Behavior, value?: FileFieldValue, placeholder?: string, description?: string,
                layout?: Layout, private _maxUploadSizeInBytes?: number,
                private _allowTypes?: string | FileUploadMIMEType | Array<FileUploadMIMEType>,
                validations?: Array<Validation>, component?: Component, parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
        this._changedFields$ = new Subject<ChangedFieldsMap>();
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

    protected valueEquality(a: FileFieldValue, b: FileFieldValue): boolean {
        let file = JSON.stringify(a) === JSON.stringify(b);
        if (a && a.file && b && b.file) {
            file = a.file.name === b.file.name;
        }
        return (!a && !b) || (!!a && !!b && a.name === b.name && file);
    }

    public registerFormControl(formControl: FormControl): void {
        if (this.initialized) {
            throw new Error('Data field can be initialized only once!'
                + ' Disconnect the previous form control before initializing the data field again!');
        }
        this.formControlRef = formControl;
        formControl.setValidators(this.resolveFormControlValidators());

        this._myValueSubscription = this._value.pipe(
            distinctUntilChanged(this.valueEquality)
        ).subscribe(newValue => {
            this.valid = this._determineFormControlValidity(formControl);
            formControl.setValue(newValue?.name ?? '');
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
