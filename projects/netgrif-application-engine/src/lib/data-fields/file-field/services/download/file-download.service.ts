import {Injectable} from '@angular/core';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileUploadDataModel} from '../../models/file-field';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../../snack-bar/snack-bar.service';
import {LoggerService} from '../../../../logger/services/logger.service';

@Injectable()
export class FileDownloadService {

    public taskId: string;

    constructor(private _taskResourceService: TaskResourceService,
                private _snackBarService: SnackBarService,
                private _logger: LoggerService,
                private _http: HttpClient) {
    }

    public downloadFile(file: FileUploadModel) {
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
                    linkElement.dispatchEvent(clickEvent);
                    const successMessage: string = (file.data as FileUploadDataModel).file.name + ' successfully download';
                    this._logger.info(successMessage);
                    this._snackBarService.openInfoSnackBar(successMessage,
                        SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1000);
                },
                (error) => {
                    this._logger.error(error);
                    this._snackBarService.openErrorSnackBar((file.data as FileUploadDataModel).file.name + ' download failed',
                        SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1000);
                });
    }

    download(): Observable<Blob> {
        return this._http.get('http://localhost:8080/api/task/5e90b517ade75e1830b07c83/file/cv_file', {responseType: 'blob'});
    }
}
