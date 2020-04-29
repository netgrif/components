import {Subscription} from 'rxjs';
import {FileUploadDataModel} from '../../../../data-fields/file-field/models/file-field';

/**
 * Extended file data model,
 * which is used to store information about a given file
 * and changes into various events from the user.
 */
export class FileUploadModel {
    stringId: string;
    data: File | FileUploadDataModel;
    inProgress: boolean;
    progress: number;
    completed: boolean;
    error?: boolean;
    uploaded?: boolean;
    downloading: boolean;
    sub?: Subscription;
}
