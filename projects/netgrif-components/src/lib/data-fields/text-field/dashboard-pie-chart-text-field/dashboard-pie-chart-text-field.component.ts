import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDashboardPieChartTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, NAE_SAVE_DATA_INFORM,
    TextField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-dashboard-pie-chart-text-field',
    templateUrl: './dashboard-pie-chart-text-field.component.html',
    styleUrls: ['./dashboard-pie-chart-text-field.component.scss']
})
export class DashboardPieChartTextFieldComponent extends AbstractDashboardPieChartTextFieldComponent {

    constructor(translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean | null = false) {
        super(translate, dataFieldPortalData, _saveDataInform);
    }

}
