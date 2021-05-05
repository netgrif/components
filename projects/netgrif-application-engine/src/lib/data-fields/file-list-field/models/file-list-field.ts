import {Observable, Subject} from 'rxjs';
import {ChangedFieldContainer} from '../../../resources/interface/changed-field-container';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {FileUploadMIMEType} from '../../file-field/models/file-field';
import {DataField} from '../../models/abstract-data-field';
import {FileListFieldValue} from './file-list-field-value';
import {Validation} from '../../models/validation';
import {Component} from '../../models/component';
import {FormControl} from '@angular/forms';

export enum FileListFieldValidation {
    MAX_FILES = 'maxFiles'
}

export class FileListField extends DataField<FileListFieldValue> {
    /**
     * Used to forward the result of the upload file backend call to the task content
     */
    private _changedFields$: Subject<ChangedFieldContainer>;
    public downloaded: Array<string>;

    /**
     * Create new instance for file field with all his properties.
     *
     * Placeholder is a substitute for the value name if not set value.
     */
    constructor(stringId: string, title: string, behavior: Behavior, value?: FileListFieldValue, placeholder?: string, description?: string,
                layout?: Layout, validations?: Validation[], private _maxUploadSizeInBytes?: number,
                private _allowTypes?: string | FileUploadMIMEType | Array<FileUploadMIMEType>, component?: Component) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component);
        this._changedFields$ = new Subject<ChangedFieldContainer>();
        this.downloaded = new Array<string>();
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
        formControl.setValue(!this.value || !this.value.namesPaths ? '' : this.value.namesPaths.map(namePath => {
            return namePath['name'];
        }).join('/'));
        this.updateFormControlState(formControl);
        this._initialized$.next(true);
        this.changed = false;
    }

    protected updateFormControlState(formControl: FormControl): void {
        this.subscribeToInnerSubjects(formControl);
        this.update();
    }
}
