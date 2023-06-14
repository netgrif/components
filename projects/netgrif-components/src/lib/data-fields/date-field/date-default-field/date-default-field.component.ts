import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDateDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DateField,
    DATE_FORMAT
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";
import {MAT_DATE_FORMATS} from "@angular/material/core";

@Component({
  selector: 'nc-date-default-field',
  templateUrl: './date-default-field.component.html',
  styleUrls: ['./date-default-field.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class DateDefaultFieldComponent extends AbstractDateDefaultFieldComponent {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateField>) {
        super(_translate, dataFieldPortalData);
    }

}
