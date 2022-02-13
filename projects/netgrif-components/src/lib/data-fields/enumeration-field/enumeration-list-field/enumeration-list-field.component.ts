import {Component} from '@angular/core';
import {AbstractEnumerationListFieldComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-list-field',
    templateUrl: './enumeration-list-field.component.html',
    styleUrls: ['./enumeration-list-field.component.scss']
})
export class EnumerationListFieldComponent extends AbstractEnumerationListFieldComponent {
    constructor() {
        super();
    }
}
