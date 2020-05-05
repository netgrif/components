import {Injectable} from '@angular/core';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {FileUploadDataModel} from '../../models/file-field';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../../snack-bar/services/snack-bar.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../translate/language.service';

/**
 * Provides to download a file from the backend and set some
 * [FileUploadModel]{@link FileUploadModel} download properties for this file.
 */
@Injectable()
export class FileDownloadService {
    /**
     * Task mongo string id:
     *  - is used for get correct file from backend
     *  - must be set before downloading
     */
    public taskId: string;

    /**
     * Only injected services.
     * @param _taskResourceService Provides to download a file from the backend
     * @param _snackBarService Used for notify user about ratio download file
     * @param _logger Log result of ratio download file
     * @param _translate Used for translate snackbar errors
     * @param _lang initialize languages
     */
    constructor(private _taskResourceService: TaskResourceService,
                private _snackBarService: SnackBarService,
                private _logger: LoggerService,
                private _translate: TranslateService,
                private _lang: LanguageService) {
    }

    /**
     * Download file from backend GET endpoint '/task/taskId/file/fileId' via TaskResourceService.
     *  - Notify user of a successful download
     *  - Log info
     *  - Download file
     *  - Catch errors
     *  @param file Selected file to download
     */
    public downloadFile(file: FileUploadModel): void {
        file.downloading = true;
        // this._taskResourceService.downloadFile(this.taskId, file.stringId)
        //     .subscribe(fileResponse => {
        //             this._downloadFileByLink(fileResponse, file);
        //
        //             file.downloading = false;
        //             const successMessage = (file.data as FileUploadDataModel).file.name + ' successfully download';
        //             this._logger.info(successMessage);
        //             this._snackBarService.openInfoSnackBar(successMessage,
        //                 SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1000);
        //         },
        //         (error) => this._handleDownloadFileErrors(error, file)
        //     );
    }

    /**
     * Download file from backend as `Blob` by a element link.
     */
    private _downloadFileByLink(fileBlob: Blob, file: FileUploadModel): void {
        const blob = new Blob([fileBlob], {type: 'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', url);
        linkElement.setAttribute('download', (file.data as FileUploadDataModel).file.name);

        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: false
        });
        linkElement.dispatchEvent(clickEvent);
    }

    /**
     * Handle error after unsuccessful response from backend.
     *  - Notify user of a unsuccessful download
     *  - Log error
     */
    private _handleDownloadFileErrors(error: any, file: FileUploadModel): void {
        file.downloading = false;
        this._logger.error(error);
        this._snackBarService.openErrorSnackBar((file.data as FileUploadDataModel).file.name +
            this._translate.instant('dataField.snackBar.downloadFail'),
            SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT);
    }
}
