import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractEnumerationIconFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField
} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-icon-field',
    templateUrl: './enumeration-icon-field.component.html',
    styleUrls: ['./enumeration-icon-field.component.scss'],
    standalone: false
})
export class EnumerationIconFieldComponent extends AbstractEnumerationIconFieldComponent {

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(dataFieldPortalData);
    }
}
