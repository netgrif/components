import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractEnumerationListFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField
} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-list-field',
    templateUrl: './enumeration-list-field.component.html',
    styleUrls: ['./enumeration-list-field.component.scss'],
    standalone: false
})
export class EnumerationListFieldComponent extends AbstractEnumerationListFieldComponent {
    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(dataFieldPortalData);
    }
}
