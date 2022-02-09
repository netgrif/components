import {FileField, FilePreviewType} from '../models/file-field';
import {SafeUrl} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';

export interface PreviewDialogData {
    dataField: FileField;
    imagePreview: SafeUrl;
    imageFull: BehaviorSubject<SafeUrl>;
    extension: FilePreviewType;
}
