import {Injectable} from '@angular/core';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';

@Injectable()
export class FileDownloadService {

    public taskId: string;

    constructor(private _taskResourceService: TaskResourceService) {
    }

    public downloadFile(file: FileUploadModel) {
        // TODO: download file
        this._taskResourceService.downloadFile(this.taskId, 'asd');
    }
}
