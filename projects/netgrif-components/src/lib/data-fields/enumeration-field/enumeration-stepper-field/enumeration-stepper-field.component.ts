import {
    Component, ElementRef, Inject, Optional
} from '@angular/core';
import {
    AbstractEnumerationStepperFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField
} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-stepper-field',
    templateUrl: './enumeration-stepper-field.component.html',
    styleUrls: ['./enumeration-stepper-field.component.scss']
})
export class EnumerationStepperFieldComponent extends AbstractEnumerationStepperFieldComponent {

    constructor(protected ref: ElementRef,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(ref, dataFieldPortalData);
    }
}
