import {
    Component, ElementRef
} from '@angular/core';
import {AbstractEnumerationStepperFieldComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-stepper-field',
    templateUrl: './enumeration-stepper-field.component.html',
    styleUrls: ['./enumeration-stepper-field.component.scss']
})
export class EnumerationStepperFieldComponent extends AbstractEnumerationStepperFieldComponent {

    constructor(protected ref: ElementRef) {
        super(ref);
    }
}
