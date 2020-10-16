import {Component} from '@angular/core';
import {AbstractEnumerationListFieldComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-enumeration-list-field',
    templateUrl: './enumeration-list-field.component.html',
    styleUrls: ['./enumeration-list-field.component.scss']
})
export class EnumerationListFieldComponent extends AbstractEnumerationListFieldComponent {
    constructor() {
        super();
    }

    validate(): boolean {
        return !this.formControlRef.valid && this.formControlRef.touched;
    }
}
