import {Injectable} from '@angular/core';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {FileUploadDataModel} from '../../models/file-field';
import {
    SnackBarHorizontalPosition,
    SnackBarService,
    SnackBarVerticalPosition
} from '../../../../snack-bar/snack-bar.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class FileDownloadService {

    public taskId = '5e8f9c3275096024c842f585';
    public fileId = 'file';

    constructor(private _taskResourceService: TaskResourceService,
                private _snackBarService: SnackBarService,
                private _logger: LoggerService) {
    }

    public downloadFile(file: FileUploadModel) {
        file.downloading = true;
        this.download()
            .subscribe(fileResource => {
                    const blob = new Blob([fileResource], {type: 'application/octet-stream'});
                    const url = window.URL.createObjectURL(blob);
                    const linkElement = document.createElement('a');

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute('download', (file.data as FileUploadDataModel).file.name);

                    const clickEvent = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: false
                    });
                    file.downloading = false;
                    linkElement.dispatchEvent(clickEvent);
                    const successMessage: string = (file.data as FileUploadDataModel).file.name + ' successfully download';
                    this._logger.info(successMessage);
                    this._snackBarService.openInfoSnackBar(successMessage,
                        SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1000);
                },
                (error) => {
                    file.downloading = false;
                    this._logger.error(error);
                    this._snackBarService.openErrorSnackBar((file.data as FileUploadDataModel).file.name + ' download failed',
                        SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1000);
                });
    }

    download(): Observable<Blob> {
        return this._taskResourceService.downloadFile(this.taskId, this.fileId);
    }
}
