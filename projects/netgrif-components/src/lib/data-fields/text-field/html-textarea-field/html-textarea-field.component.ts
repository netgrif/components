import {AfterViewInit, Component, Inject, Optional} from '@angular/core';
import {
    AbstractHtmlTextareaFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextAreaField, ValidationRegistryService,
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'nc-html-textarea-field',
    templateUrl: './html-textarea-field.component.html',
    styleUrls: ['./html-textarea-field.component.scss']
})
export class HtmlTextareaFieldComponent extends AbstractHtmlTextareaFieldComponent implements AfterViewInit {
    constructor(protected _translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                protected _sanitizer: DomSanitizer,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>) {
        super(_translate, validationRegistry, _sanitizer, dataFieldPortalData);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (!this.dataField?.placeholder) {
                this.dataField.placeholder = this._translate.instant('dataField.textarea.insertText');
            }
        })
    }
}
