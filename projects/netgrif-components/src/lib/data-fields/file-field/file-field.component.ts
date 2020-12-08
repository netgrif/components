import {Component, ElementRef, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractFileFieldComponent,
    LoggerService,
    NAE_INFORM_ABOUT_INVALID_DATA,
    SnackBarService,
    TaskResourceService
} from '@netgrif/application-engine';
import {DomSanitizer} from '@angular/platform-browser';

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
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null,
                protected _sanitizer: DomSanitizer,
                protected el: ElementRef) {
        super(taskResourceService, log, snackbar, translate, informAboutInvalidData, _sanitizer, el);
    }
}

