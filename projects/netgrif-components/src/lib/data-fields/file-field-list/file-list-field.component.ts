import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractFileListFieldComponent, LoggerService, SnackBarService, TaskResourceService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-file-list-field',
    templateUrl: './file-list-field.component.html',
    styleUrls: ['./file-list-field.component.scss']
})
export class FileListFieldComponent extends AbstractFileListFieldComponent {

    constructor(protected _taskResourceService: TaskResourceService,
                protected _log: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService) {
        super(_taskResourceService, _log, _snackbar, _translate);
    }
}
