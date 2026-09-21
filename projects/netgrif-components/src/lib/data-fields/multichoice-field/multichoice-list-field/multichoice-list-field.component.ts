import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractMultichoiceListFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    MultichoiceField
} from '@netgrif/components-core';

@Component({
    selector: 'nc-multichoice-list-field',
    templateUrl: './multichoice-list-field.component.html',
    styleUrls: ['./multichoice-list-field.component.scss']
})
export class MultichoiceListFieldComponent extends AbstractMultichoiceListFieldComponent {

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(dataFieldPortalData);
    }
}
