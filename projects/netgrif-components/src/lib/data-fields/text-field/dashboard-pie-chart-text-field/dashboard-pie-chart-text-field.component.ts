import {Component} from '@angular/core';
import {AbstractDashboardPieChartTextFieldComponent} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-dashboard-pie-chart-text-field',
    templateUrl: './dashboard-pie-chart-text-field.component.html',
    styleUrls: ['./dashboard-pie-chart-text-field.component.scss']
})
export class DashboardPieChartTextFieldComponent extends AbstractDashboardPieChartTextFieldComponent {

    constructor(translate: TranslateService) {
        super(translate);
    }

}
