import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractRichTextareaFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextAreaField,
    ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-rich-textarea-field',
    templateUrl: './rich-textarea-field.component.html',
    styleUrls: ['./rich-textarea-field.component.scss']
})
export class RichTextareaFieldComponent extends AbstractRichTextareaFieldComponent {
    constructor(_translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>,
                _validationRegistry: ValidationRegistryService) {
        super(_translate, dataFieldPortalData, _validationRegistry);
    }
}
