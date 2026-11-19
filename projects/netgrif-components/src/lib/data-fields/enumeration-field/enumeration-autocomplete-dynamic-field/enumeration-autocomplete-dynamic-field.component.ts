import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {
    AbstractEnumerationAutocompleteDynamicFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DynamicEnumerationField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nc-enumeration-autocomplete-dynamic-field',
  templateUrl: './enumeration-autocomplete-dynamic-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EnumerationAutocompleteDynamicFieldComponent extends AbstractEnumerationAutocompleteDynamicFieldComponent {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DynamicEnumerationField>) {
        super(_translate, dataFieldPortalData);
    }
}
