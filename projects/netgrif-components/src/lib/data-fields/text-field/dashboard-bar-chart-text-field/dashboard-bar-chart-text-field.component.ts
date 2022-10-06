import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractDashboardBarChartTextFieldComponent} from '@netgrif/components-core';

@Component({
  selector: 'nc-dashboard-bar-chart-text-field',
  templateUrl: './dashboard-bar-chart-text-field.component.html',
  styleUrls: ['./dashboard-bar-chart-text-field.component.scss']
})
export class DashboardBarChartTextFieldComponent extends AbstractDashboardBarChartTextFieldComponent {

    constructor(translate: TranslateService) {
        super(translate);
    }

}
