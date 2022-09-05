import { Component} from '@angular/core';
import {AbstractMultichoiceAutocompleteFieldComponentComponent} from 'netgrif-components-core';

@Component({
  selector: 'nc-multichoice-autocomplete-field',
  templateUrl: './multichoice-autocomplete-field.component.html',
  styleUrls: ['./multichoice-autocomplete-field.component.scss']
})
export class MultichoiceAutocompleteFieldComponent  extends AbstractMultichoiceAutocompleteFieldComponentComponent {

    constructor() {
        super();
    }

}
