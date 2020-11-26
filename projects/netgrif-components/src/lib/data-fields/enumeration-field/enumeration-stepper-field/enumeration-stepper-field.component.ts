import {
    Component
} from '@angular/core';
import {AbstractEnumerationStepperFieldComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-enumeration-stepper-field',
    templateUrl: './enumeration-stepper-field.component.html',
    styleUrls: ['./enumeration-stepper-field.component.scss']
})
export class EnumerationStepperFieldComponent extends AbstractEnumerationStepperFieldComponent {
    constructor() {
        super();
    }

}
