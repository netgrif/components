import {Component} from '@angular/core';
import {
    AbstractEnumerationAutocompleteDynamicFieldComponent
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nc-enumeration-autocomplete-dynamic-field',
  templateUrl: './enumeration-autocomplete-dynamic-field.component.html',
  styleUrls: ['./enumeration-autocomplete-dynamic-field.component.scss']
})
export class EnumerationAutocompleteDynamicFieldComponent extends AbstractEnumerationAutocompleteDynamicFieldComponent {

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
