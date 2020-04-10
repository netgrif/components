import {Injectable} from '@angular/core';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileUploadDataModel} from '../../models/file-field';
import {catchError} from 'rxjs/operators';
import {SnackBarService} from '../../../../snack-bar/snack-bar.service';

@Injectable()
export class FileDownloadService {

    public taskId: string;

    constructor(private _taskResourceService: TaskResourceService,
                private _snackBarService: SnackBarService,
                private _http: HttpClient) {
    }

    public downloadFile(file: FileUploadModel) {
        this.download()
            .pipe(
                // catchError((err) => {
                //     console.log(err);
                //     this._snackBarService.openErrorSnackBar('Can´t download ' + (file.data as FileUploadDataModel).file.name + ' file.');
                // })
            )
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
            this._snackBarService.openInfoSnackBar( (file.data as FileUploadDataModel).file.name + ' successfully download.');
        });
    }

    download(): Observable<Blob> {
        return this._http.get('http://localhost:8080/api/task/5e90b517ade75e1830b07c83/file/cv_file', {responseType: 'blob'});
    }
}
