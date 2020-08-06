import {Observable, Subject} from 'rxjs';
import {ChangedFieldContainer} from '../../../resources/interface/changed-field-container';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {FileUploadMIMEType} from '../../file-field/models/file-field';
import {DataField} from '../../models/abstract-data-field';
import {FileListFieldValue} from './file-list-field-value';
import {Validation} from '../../models/validation';

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
                layout?: Layout, public validations?: Validation[],
                private _allowTypes?: string | FileUploadMIMEType | Array<FileUploadMIMEType>) {
        super(stringId, title, value, behavior, placeholder, description, layout);
        this._changedFields$ = new Subject<ChangedFieldContainer>();
        this.downloaded = new Array<string>();
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
        let array = !a === !b;
        if (a && a.files && b && b.files) {
            array = a.files.every((element, index) => element.name === b.files[index].name);
        }
        if (!array) {
            return false;
        }
        if (a && a.names && b && b.names) {
            array = a.names.every((element, index) => element === b.names[index]);
        }
        return (!a && !b) || (!!a && !!b && array);
    }
}
