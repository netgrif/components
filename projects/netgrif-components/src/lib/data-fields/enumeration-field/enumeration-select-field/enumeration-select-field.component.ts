import {Component} from '@angular/core';
import {AbstractEnumerationSelectFieldComponent} from '@netgrif/application-engine';

@Component({
  selector: 'nc-enumeration-select-field',
  templateUrl: './enumeration-select-field.component.html',
  styleUrls: ['./enumeration-select-field.component.scss']
})
export class EnumerationSelectFieldComponent extends AbstractEnumerationSelectFieldComponent {
    constructor() {
        super();
    }
}
