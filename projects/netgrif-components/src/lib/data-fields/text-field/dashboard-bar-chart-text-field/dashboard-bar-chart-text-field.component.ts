import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractDashboardBarChartTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextField
} from '@netgrif/components-core';

@Component({
  selector: 'nc-dashboard-bar-chart-text-field',
  templateUrl: './dashboard-bar-chart-text-field.component.html',
  styleUrls: ['./dashboard-bar-chart-text-field.component.scss']
})
export class DashboardBarChartTextFieldComponent extends AbstractDashboardBarChartTextFieldComponent {

    constructor(translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>) {
        super(translate, dataFieldPortalData);
    }

}
