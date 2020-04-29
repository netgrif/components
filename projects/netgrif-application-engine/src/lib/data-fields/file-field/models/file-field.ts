import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';

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
export class FileField extends DataField<Array<File>> {
    /**
     * Specifies the size of all uploaded files in bytes.
     *
     * It is an indicator for checking the oversized size in the Petri Net.
     */
    public filesSize = 0;

    /**
     * Create new instance for file field with all his properties.
     *
     * Placeholder is a substitute for the value name if not set value.
     */
    constructor(stringId: string, title: string, behavior: Behavior, value?: Array<File>, placeholder?: string, description?: string,
                layout?: Layout, private _maxUploadSizeInBytes?: number, private _maxUploadFiles: number = 1,
                private _zipped: boolean = true, private _allowTypes?: string | FileUploadMIMEType | Array<FileUploadMIMEType>) {
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

    /**
     * We assume that files are always given in the same order.
     */
    protected valueEquality(a: Array<File>, b: Array<File>): boolean {
        return (!a && !b) || (
            !!a
            && !!b
            && a.length === b.length
            && a.every((element, index) => element.name === b[index].name)
        );
    }
}
