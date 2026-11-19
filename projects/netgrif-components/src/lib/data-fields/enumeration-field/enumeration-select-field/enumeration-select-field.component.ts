import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {
    AbstractEnumerationSelectFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField
} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-select-field',
    templateUrl: './enumeration-select-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EnumerationSelectFieldComponent extends AbstractEnumerationSelectFieldComponent {
    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(dataFieldPortalData);
    }
}
