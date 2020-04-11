import {Injectable} from '@angular/core';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {FileUploadDataModel} from '../../models/file-field';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../../snack-bar/snack-bar.service';
import {LoggerService} from '../../../../logger/services/logger.service';

@Injectable()
export class FileDownloadService {

    public taskId: string;

    constructor(private _taskResourceService: TaskResourceService,
                private _snackBarService: SnackBarService,
                private _logger: LoggerService) {
    }

    /**
     * Download file from backend GET endpoint '/task/taskId/file/fileId' via TaskResourceService.
     * After successful response from backend:
     *      - create 'a' element
     *      - set url attribute
     *      - set a name for the file to be downloaded
     *      - trigger a click event on created 'a' element - starting download process
     *      - notification to the user of a successful download
     *      - info log with LoggerService
     * After unsuccessful response from backend:
     *      - notification to the user of a unsuccessful download
     *      - error log with LoggerService
     */
    public downloadFile(file: FileUploadModel) {
        file.downloading = true;
        this._taskResourceService.downloadFile(this.taskId, file.stringId)
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
}
