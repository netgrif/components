import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDateTimeDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DateTimeField
} from '@netgrif/components-core'
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nc-date-time-default-field',
  templateUrl: './date-time-default-field.component.html',
  styleUrls: ['./date-time-default-field.component.scss']
})
export class DateTimeDefaultFieldComponent extends AbstractDateTimeDefaultFieldComponent {

  constructor(protected _translate: TranslateService,
              @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
      super(_translate, dataFieldPortalData);
  }

}
