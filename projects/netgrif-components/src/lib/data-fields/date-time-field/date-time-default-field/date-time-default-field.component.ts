import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDateTimeDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DateTimeField,
    DATE_TIME_FORMAT
} from '@netgrif/components-core'
import {TranslateService} from "@ngx-translate/core";
import {NGX_MAT_DATE_FORMATS} from "@angular-material-components/datetime-picker";

@Component({
  selector: 'nc-date-time-default-field',
  templateUrl: './date-time-default-field.component.html',
  styleUrls: ['./date-time-default-field.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class DateTimeDefaultFieldComponent extends AbstractDateTimeDefaultFieldComponent {

  constructor(protected _translate: TranslateService,
              @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
      super(_translate, dataFieldPortalData);
  }

}
