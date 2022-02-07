import {Component} from '@angular/core';
import {AbstractEnumerationIconFieldComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-icon-field',
    templateUrl: './enumeration-icon-field.component.html',
    styleUrls: ['./enumeration-icon-field.component.scss']
})
export class EnumerationIconFieldComponent extends AbstractEnumerationIconFieldComponent {

    constructor() {
        super();
    }
}
