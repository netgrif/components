import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractMultichoiceSelectFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    MultichoiceField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-multichoice-select-field',
    templateUrl: './multichoice-select-field.component.html',
    styleUrls: ['./multichoice-select-field.component.scss']
})
export class MultichoiceSelectFieldComponent extends AbstractMultichoiceSelectFieldComponent {

    constructor(translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(translate, validationRegistry, dataFieldPortalData);
    }
}
