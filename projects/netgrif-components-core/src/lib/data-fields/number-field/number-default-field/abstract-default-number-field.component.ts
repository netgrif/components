import {TranslateService} from '@ngx-translate/core';
import {AbstractNumberErrorsComponent} from '../abstract-number-errors.component';
import {Component, Inject, Optional} from '@angular/core';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {NumberField} from "../models/number-field";
import {NAE_SAVE_DATA_INFORM} from "../../models/save-data-inform-token";

@Component({
    selector: 'ncc-abstract-number-default-field',
    template: ''
})
export abstract class AbstractDefaultNumberFieldComponent extends AbstractNumberErrorsComponent {

    protected constructor(translateService: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>,
                          @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean | null = false) {
        super(translateService, dataFieldPortalData, _saveDataInform);
    }
}
