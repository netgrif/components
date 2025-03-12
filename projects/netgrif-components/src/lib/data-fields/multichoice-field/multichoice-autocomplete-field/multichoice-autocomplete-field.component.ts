import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractMultichoiceAutocompleteFieldComponentComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    MultichoiceField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nc-multichoice-autocomplete-field',
  templateUrl: './multichoice-autocomplete-field.component.html',
  styleUrls: ['./multichoice-autocomplete-field.component.scss']
})
export class MultichoiceAutocompleteFieldComponent  extends AbstractMultichoiceAutocompleteFieldComponentComponent {

    constructor(translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(translate, validationRegistry, dataFieldPortalData);
    }

}
