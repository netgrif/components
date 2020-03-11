import {DataField} from "../models/abstract-data-field";
import {Subscription} from "rxjs";
import {Behaviour} from '../models/behaviour';

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

export class FileField extends DataField<File> {

    public filesSize: number = 0;

    constructor(title: string, placeholder: string, behaviour: Behaviour, value?: File, private _maxUploadSizeInBytes?: number,
                private _maxUploadFiles: number = 1, private _zipped: boolean = true,
                private _allowTypes?: FileUploadMIMEtype | string | Array<FileUploadMIMEtype>) {
        super(title, placeholder, value, behaviour);
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
        return this._allowTypes.toString();
    }
}
