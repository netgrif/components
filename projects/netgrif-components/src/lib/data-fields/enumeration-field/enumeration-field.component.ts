import {Component} from '@angular/core';
import {AbstractEnumerationFieldComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-enumeration-field',
    templateUrl: './enumeration-field.component.html',
    styleUrls: ['./enumeration-field.component.scss']
})
export class EnumerationFieldComponent extends AbstractEnumerationFieldComponent {
    constructor() {
        super();
    }
}
