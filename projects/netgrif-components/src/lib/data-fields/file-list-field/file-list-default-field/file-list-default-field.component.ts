import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {
    TaskResourceService,
    LoggerService,
    SnackBarService,
    EventService,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    FileListField, AbstractFileListDefaultFieldComponent
} from '@netgrif/components-core'

@Component({
  selector: 'nc-file-list-default-field',
  templateUrl: './file-list-default-field.component.html',
  styleUrls: ['./file-list-default-field.component.scss']
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
