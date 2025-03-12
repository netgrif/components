import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractMultichoiceListFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    MultichoiceField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-multichoice-list-field',
    templateUrl: './multichoice-list-field.component.html',
    styleUrls: ['./multichoice-list-field.component.scss']
})
export class MultichoiceListFieldComponent extends AbstractMultichoiceListFieldComponent {

    constructor(translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(translate, validationRegistry, dataFieldPortalData);
    }
}
