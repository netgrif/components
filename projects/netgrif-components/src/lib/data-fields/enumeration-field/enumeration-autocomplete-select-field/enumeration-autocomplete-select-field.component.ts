import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractEnumerationAutocompleteSelectFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField
} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-autocomplete-select-field',
    templateUrl: './enumeration-autocomplete-select-field.component.html',
    styleUrls: ['./enumeration-autocomplete-select-field.component.scss']
})
export class EnumerationAutocompleteSelectFieldComponent extends AbstractEnumerationAutocompleteSelectFieldComponent {

    constructor(_translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(_translate, dataFieldPortalData);
    }
}
