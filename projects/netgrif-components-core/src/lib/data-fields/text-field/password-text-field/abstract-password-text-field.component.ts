import {Component, Inject, Optional} from '@angular/core';
import {TextField} from '../models/text-field';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";

@Component({
    selector: 'ncc-abstract-password-text-field',
    template: ''
})
export abstract class AbstractPasswordTextFieldComponent extends AbstractTextErrorsComponent<TextField> {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>) {
        super(_translate, dataFieldPortalData);
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.dataField, this.formControlRef);
    }
}
