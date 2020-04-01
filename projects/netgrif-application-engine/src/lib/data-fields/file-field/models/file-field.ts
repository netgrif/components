import {DataField, Layout} from '../../models/abstract-data-field';
import {Subscription} from 'rxjs';
import {Behavior} from '../../models/behavior';

export enum FileUploadMIMEtype {
    IMAGE = 'image/*',
    VIDEO = 'video/*',
    AUDIO = 'audio/*',
    PDF = '.pdf',
    JPG = '.jpg',
    XML = '.xml',
    DOC_DOCX = '.doc,.docx',
    XLS_XLSX = '.xls,.xlsx'
}

export interface FileUploadModel {
    data: FileUploadDataModel;
    state: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    successfullyUploaded: boolean;
    sub?: Subscription;
}

interface FileUploadDataModel {
    file: File;
    name: string;
    extension: string;
}

export class FileField extends DataField<Array<File>> {

    public filesSize = 0;

    constructor(stringId: string, title: string, behavior: Behavior, value?: Array<File>, placeholder?: string, description?: string,
                layout?: Layout, private _maxUploadSizeInBytes?: number, private _maxUploadFiles: number = 1,
                private _zipped: boolean = true, private _allowTypes?: string | FileUploadMIMEtype | Array<FileUploadMIMEtype>) {
        super(stringId, title, value, behavior, placeholder, description, layout);
    }

    get maxUploadSizeInBytes(): number {
        return this._maxUploadSizeInBytes;
    }

    get maxUploadFiles(): number {
        return this._maxUploadFiles;
    }

    get zipped(): boolean {
        return this._zipped;
    }

    get allowTypes(): string {
        return this._allowTypes instanceof Array ? this._allowTypes.toString() : this._allowTypes;
    }

    protected valueEquality(a: Array<File>, b: Array<File>): boolean {
        // we assume that files are always given in the same order
        return (!a && !b) || (
            !!a
            && !!b
            && a.length === b.length
            && a.every( (element, index) => element.name === b[index].name)
        );
    }
}
