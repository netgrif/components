import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {
    AbstractFileListDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    EventService,
    FileListField,
    LoggerService,
    SnackBarService,
    TaskResourceService
} from '@netgrif/components-core'

@Component({
    selector: 'nc-file-list-default-field',
    templateUrl: './file-list-default-field.component.html',
    styleUrls: ['./file-list-default-field.component.scss'],
    standalone: false
})
export class FileListDefaultFieldComponent extends AbstractFileListDefaultFieldComponent {

    constructor(taskResourceService: TaskResourceService,
                log: LoggerService,
                snackbar: SnackBarService,
                translate: TranslateService,
                eventService: EventService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FileListField>) {
        super(taskResourceService, log, snackbar, translate, eventService, dataFieldPortalData);
    }
}
