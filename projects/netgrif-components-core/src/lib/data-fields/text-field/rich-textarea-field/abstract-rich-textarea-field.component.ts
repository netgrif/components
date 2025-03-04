import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {TextAreaField} from '../models/text-area-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";

@Component({
    selector: 'ncc-abstract-rich-text-field',
    template: ''
})
export abstract class AbstractRichTextareaFieldComponent extends AbstractTextErrorsComponent<TextAreaField> {

    // TODO BUG: update on blur dont working, switch back to update on ngModel
    constructor(protected _translate: TranslateService,
                protected _validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>) {
        super(_translate, _validationRegistry, dataFieldPortalData);
    }
}
