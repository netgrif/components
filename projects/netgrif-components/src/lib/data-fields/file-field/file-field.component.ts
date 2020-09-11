import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractFileFieldComponent,
    TaskResourceService,
    LoggerService,
    SnackBarService
} from '@netgrif/application-engine';

@Component({
    selector: 'nc-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss'],
})
export class FileFieldComponent extends AbstractFileFieldComponent {

    constructor(protected _taskResourceService: TaskResourceService,
                protected _log: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService) {
        super(_taskResourceService, _log, _snackbar, _translate);
    }
}

