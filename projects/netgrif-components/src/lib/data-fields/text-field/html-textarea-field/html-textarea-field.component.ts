import {AfterViewInit, Component, Inject, Optional} from '@angular/core';
import {
    AbstractHtmlTextareaFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, NAE_SAVE_DATA_INFORM,
    TextAreaField,
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'nc-html-textarea-field',
    templateUrl: './html-textarea-field.component.html',
    styleUrls: ['./html-textarea-field.component.scss']
})
export class HtmlTextareaFieldComponent extends AbstractHtmlTextareaFieldComponent implements AfterViewInit {
    constructor(protected _translate: TranslateService, protected _sanitizer: DomSanitizer,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean) {
        super(_translate, _sanitizer, dataFieldPortalData, _saveDataInform);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (!this.dataField?.placeholder) {
                this.dataField.placeholder = this._translate.instant('dataField.textarea.insertText');
            }
        })
    }
}
