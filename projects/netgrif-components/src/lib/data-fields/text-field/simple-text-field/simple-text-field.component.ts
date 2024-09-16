import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractSimpleTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, NAE_SAVE_DATA_INFORM,
    TextField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-simple-text-field',
    templateUrl: './simple-text-field.component.html',
    styleUrls: ['./simple-text-field.component.scss']
})
export class SimpleTextFieldComponent extends AbstractSimpleTextFieldComponent {
    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean) {
        super(_translate, dataFieldPortalData, _saveDataInform);
    }
}
