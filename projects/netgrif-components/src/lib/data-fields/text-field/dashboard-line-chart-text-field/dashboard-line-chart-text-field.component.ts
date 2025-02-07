import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDashboardLineChartTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, NAE_SAVE_DATA_INFORM,
    TextField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-dashboard-line-chart-text-field',
    templateUrl: './dashboard-line-chart-text-field.component.html',
    styleUrls: ['./dashboard-line-chart-text-field.component.scss']
})
export class DashboardLineChartTextFieldComponent extends AbstractDashboardLineChartTextFieldComponent {

    constructor(translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean) {
        super(translate, dataFieldPortalData, _saveDataInform);
    }

}
