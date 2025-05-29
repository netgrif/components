import {Component, Inject, Optional} from '@angular/core';
import {
    DATA_FIELD_PORTAL_DATA, DataFieldPortalData,
    EventService, FileField,
    LoggerService,
    SnackBarService,
    TaskResourceService,
    AbstractFileDefaultFieldComponent
} from "@netgrif/components-core";
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {PreviewDialogComponent} from "../preview-dialog/preview-dialog.component";

@Component({
  selector: 'nc-file-default-field',
  templateUrl: './file-default-field.component.html',
  styleUrls: ['./file-default-field.component.scss'],
    standalone: false
})
export class FileDefaultFieldComponent extends AbstractFileDefaultFieldComponent{

    constructor(taskResourceService: TaskResourceService,
                log: LoggerService,
                snackbar: SnackBarService,
                translate: TranslateService,
                eventService: EventService,
                protected _sanitizer: DomSanitizer,
                protected dialog: MatDialog,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FileField>) {
        super(taskResourceService, log, snackbar, translate, eventService, _sanitizer, dataFieldPortalData);
    }

    public showPreviewDialog() {
        super.showPreviewDialog();
        this.dialog.open(PreviewDialogComponent, {
            data: {
                dataField: this.dataField,
                imagePreview: this.previewSource,
                imageFull: this.fullSource,
                extension: this.previewExtension
            }
        });
    }

}
