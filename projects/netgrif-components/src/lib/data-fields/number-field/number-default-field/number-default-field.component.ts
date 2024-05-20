import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDefaultNumberFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, NAE_SAVE_DATA_INFORM,
    NumberField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-number-default-field',
    templateUrl: './number-default-field.component.html',
    styleUrls: ['./number-default-field.component.scss']
})
export class NumberDefaultFieldComponent extends AbstractDefaultNumberFieldComponent {
    constructor(translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean | null = false) {
        super(translate, dataFieldPortalData, _saveDataInform);
    }
}
