import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractFileFieldComponent, EventService,
    LoggerService,
    NAE_INFORM_ABOUT_INVALID_DATA,
    SnackBarService,
    TaskResourceService
} from '@netgrif/components-core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {PreviewDialogComponent} from './preview-dialog/preview-dialog.component';

@Component({
    selector: 'nc-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss'],
})
export class FileFieldComponent extends AbstractFileFieldComponent {

    constructor(taskResourceService: TaskResourceService,
                log: LoggerService,
                snackbar: SnackBarService,
                translate: TranslateService,
                eventService: EventService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null,
                protected _sanitizer: DomSanitizer,
                protected dialog: MatDialog) {
        super(taskResourceService, log, snackbar, translate, eventService, informAboutInvalidData, _sanitizer);
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

