import {
    Component, ElementRef, Inject, Optional
} from '@angular/core';
import {
    AbstractEnumerationStepperFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-enumeration-stepper-field',
    templateUrl: './enumeration-stepper-field.component.html',
    styleUrls: ['./enumeration-stepper-field.component.scss']
})
export class EnumerationStepperFieldComponent extends AbstractEnumerationStepperFieldComponent {

    constructor(protected ref: ElementRef,
                translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(ref, translate, validationRegistry,  dataFieldPortalData);
    }
}
