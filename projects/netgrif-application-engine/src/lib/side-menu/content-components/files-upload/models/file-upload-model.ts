import {Subscription} from 'rxjs';
import {FileUploadDataModel} from '../../../../data-fields/file-field/models/file-field';

export class FileUploadModel {
    stringId: string;
    data: File | FileUploadDataModel;
    state: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    successfullyUploaded: boolean;
    sub?: Subscription;
}
