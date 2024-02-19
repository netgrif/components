import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractStringCollectionDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TaskRefField,
    ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nc-string-collection-default-field',
  templateUrl: './string-collection-default-field.component.html',
  styleUrls: ['./string-collection-default-field.component.scss']
})
export class StringCollectionDefaultFieldComponent extends AbstractStringCollectionDefaultFieldComponent {

    constructor(_translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>,
                _validationRegistry: ValidationRegistryService) {
        super(_translate, dataFieldPortalData, _validationRegistry)
    }

}
