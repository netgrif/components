import {Component, Inject, NgZone, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractTextareaFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextAreaField,
    ValidationRegistryService
} from '@netgrif/components-core';

@Component({
    selector: 'nc-textarea-field',
    templateUrl: './textarea-field.component.html',
    styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends AbstractTextareaFieldComponent {

    constructor(_translate: TranslateService, protected _ngZone: NgZone,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>,
                _validationRegistry: ValidationRegistryService) {
        super(_translate, _ngZone, dataFieldPortalData, _validationRegistry);
    }
}
