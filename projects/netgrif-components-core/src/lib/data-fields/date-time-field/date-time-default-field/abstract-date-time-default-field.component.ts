import {Component, Inject, Input, Optional} from "@angular/core";
import {
    AbstractTimeInstanceFieldComponent
} from "../../time-instance-abstract-field/abstract-time-instance-field.component";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {DateTimeField} from "../models/date-time-field";

@Component({
    selector: 'ncc-abstract-date-time-default-field',
    template: ''
})
export abstract class AbstractDateTimeDefaultFieldComponent extends AbstractTimeInstanceFieldComponent<DateTimeField> {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
        super(_translate, dataFieldPortalData)
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
