import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractMultichoiceSelectFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    MultichoiceField
} from '@netgrif/components-core';

@Component({
    selector: 'nc-multichoice-select-field',
    templateUrl: './multichoice-select-field.component.html',
    styleUrls: ['./multichoice-select-field.component.scss'],
    standalone: false
})
export class MultichoiceSelectFieldComponent extends AbstractMultichoiceSelectFieldComponent {

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(dataFieldPortalData);
    }
}
