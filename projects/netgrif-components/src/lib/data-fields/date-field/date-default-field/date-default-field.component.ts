import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDateDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DateField
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nc-date-default-field',
  templateUrl: './date-default-field.component.html',
  styleUrls: ['./date-default-field.component.scss']
})
export class DateDefaultFieldComponent extends AbstractDateDefaultFieldComponent {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateField>) {
        super(_translate, dataFieldPortalData);
    }

}
