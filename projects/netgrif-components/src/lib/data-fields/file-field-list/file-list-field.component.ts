import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractFileListFieldComponent, EventService,
    LoggerService,
    NAE_INFORM_ABOUT_INVALID_DATA,
    SnackBarService,
    TaskResourceService
} from '@netgrif/components-core';

@Component({
    selector: 'nc-file-list-field',
    templateUrl: './file-list-field.component.html',
    styleUrls: ['./file-list-field.component.scss']
})
export class FileListFieldComponent extends AbstractFileListFieldComponent {

    constructor(taskResourceService: TaskResourceService,
                log: LoggerService,
                snackbar: SnackBarService,
                translate: TranslateService,
                eventService: EventService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(taskResourceService, log, snackbar, translate, eventService, informAboutInvalidData);
    }
}
