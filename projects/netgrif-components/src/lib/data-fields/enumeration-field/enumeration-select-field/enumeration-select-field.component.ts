import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractEnumerationSelectFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField
} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-select-field',
    templateUrl: './enumeration-select-field.component.html',
    styleUrls: ['./enumeration-select-field.component.scss'],
    standalone: false
})
export class EnumerationSelectFieldComponent extends AbstractEnumerationSelectFieldComponent {
    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(dataFieldPortalData);
    }
}
