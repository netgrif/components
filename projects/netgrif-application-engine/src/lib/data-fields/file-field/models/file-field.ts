import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {FileFieldValue} from './file-field-value';
import {Observable, Subject} from 'rxjs';
import {ChangedFieldContainer} from '../../../resources/interface/changed-field-container';
import {Component} from '../../models/component';
import {FormControl} from '@angular/forms';

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
    private _changedFields$: Subject<ChangedFieldContainer>;

    public downloaded: boolean;

    /**
     * Create new instance for file field with all his properties.
     *
     * Placeholder is a substitute for the value name if not set value.
     */
    constructor(stringId: string, title: string, behavior: Behavior, value?: FileFieldValue, placeholder?: string, description?: string,
                layout?: Layout, private _maxUploadSizeInBytes?: number,
                private _allowTypes?: string | FileUploadMIMEType | Array<FileUploadMIMEType>, component?: Component) {
        super(stringId, title, value, behavior, placeholder, description, layout, component);
        this._changedFields$ = new Subject<ChangedFieldContainer>();
    }

    get maxUploadSizeInBytes(): number {
        return this._maxUploadSizeInBytes;
    }

    get allowTypes(): string {
        return this._allowTypes instanceof Array ? this._allowTypes.toString() : this._allowTypes;
    }

    get changedFields$(): Observable<ChangedFieldContainer> {
        return this._changedFields$.asObservable();
    }

    public emitChangedFields(change: ChangedFieldContainer): void {
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
        formControl.setValue(this.value.name);
        this.updateFormControlState(formControl);
        this.initialized = true;
        this._initialized$.next(true);
        this._initialized$.complete();
        this.changed = false;
    }

    public updateFormControlState(formControl: FormControl): void {
        this._update.subscribe(() => {
            this.disabled ? formControl.disable() : formControl.enable();
            formControl.clearValidators();
            formControl.setValidators(this.resolveFormControlValidators());
            formControl.updateValueAndValidity();
            this.valid = this._determineFormControlValidity(formControl);
        });
        this._block.subscribe(bool => {
            if (bool) {
                formControl.disable();
            } else {
                this.disabled ? formControl.disable() : formControl.enable();
            }
        });
        this._touch.subscribe(bool => {
            if (bool) {
                formControl.markAsTouched();
            } else {
                formControl.markAsUntouched();
            }
        });
        this.update();
        this.valid = this._determineFormControlValidity(formControl);
    }
}
