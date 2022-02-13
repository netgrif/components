import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractEnumerationAutocompleteSelectFieldComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-autocomplete-select-field',
    templateUrl: './enumeration-autocomplete-select-field.component.html',
    styleUrls: ['./enumeration-autocomplete-select-field.component.scss']
})
export class EnumerationAutocompleteSelectFieldComponent extends AbstractEnumerationAutocompleteSelectFieldComponent {

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
