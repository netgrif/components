import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractStringCollectionDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TaskRefField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nc-string-collection-default-field',
  templateUrl: './string-collection-default-field.component.html',
  styleUrls: ['./string-collection-default-field.component.scss'],
    standalone: false
})
export class StringCollectionDefaultFieldComponent extends AbstractStringCollectionDefaultFieldComponent {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>) {
        super(_translate, dataFieldPortalData)
    }

}
