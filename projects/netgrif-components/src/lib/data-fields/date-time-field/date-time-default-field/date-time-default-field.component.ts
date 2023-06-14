import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDateTimeDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DateTimeField,
    DATE_FORMAT
} from '@netgrif/components-core'
import {TranslateService} from "@ngx-translate/core";
import {MAT_DATE_FORMATS} from "@angular/material/core";

@Component({
  selector: 'nc-date-time-default-field',
  templateUrl: './date-time-default-field.component.html',
  styleUrls: ['./date-time-default-field.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class DateTimeDefaultFieldComponent extends AbstractDateTimeDefaultFieldComponent {

  constructor(protected _translate: TranslateService,
              @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
      super(_translate, dataFieldPortalData);
  }

}
