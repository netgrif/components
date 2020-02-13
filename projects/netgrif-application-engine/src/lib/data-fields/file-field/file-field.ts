import {DataField} from "../abstract-data-field";
import {Subscription} from "rxjs";

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
    data: File;
    state: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    successfullyUploaded: boolean,
    sub?: Subscription;
}

export class FileField extends DataField<File> {

    public filesSize: number = 0;

    constructor(title: string, placeholder: string, value?: File, private _maxUploadSizeInBytes?: number,
                private _maxUploadFiles: number = 1, private _maxShowListFiles: number = 3, private _zipped: boolean = false,
                private _allowTypes?: FileUploadMIMEtype | string | Array<FileUploadMIMEtype>) {
        super(title, placeholder, value);
    }


    get maxUploadSizeInBytes(): number {
        return this._maxUploadSizeInBytes;
    }

    get maxUploadFiles(): number {
        return this._maxUploadFiles;
    }

    get maxShowListFiles(): number {
        return this._maxShowListFiles;
    }

    get zipped(): boolean {
        return this._zipped;
    }

    get allowTypes(): string {
        return this._allowTypes.toString();
    }
}
