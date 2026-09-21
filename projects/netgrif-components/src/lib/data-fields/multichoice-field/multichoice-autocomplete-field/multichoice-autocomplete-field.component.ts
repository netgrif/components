import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractMultichoiceAutocompleteFieldComponentComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    MultichoiceField
} from '@netgrif/components-core';

@Component({
  selector: 'nc-multichoice-autocomplete-field',
  templateUrl: './multichoice-autocomplete-field.component.html',
  styleUrls: ['./multichoice-autocomplete-field.component.scss']
})
export class MultichoiceAutocompleteFieldComponent  extends AbstractMultichoiceAutocompleteFieldComponentComponent {

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(dataFieldPortalData);
    }

}
