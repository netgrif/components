import {Component, Inject, Optional} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {DateField} from "../models/date-field";
import {
    AbstractTimeInstanceFieldComponent
} from "../../time-instance-abstract-field/abstract-time-instance-field.component";

@Component({
    selector: 'ncc-abstract-date-default-field',
    template: ''
})
export abstract class AbstractDateDefaultFieldComponent extends AbstractTimeInstanceFieldComponent<DateField> {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateField>) {
        super(_translate, dataFieldPortalData)
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
