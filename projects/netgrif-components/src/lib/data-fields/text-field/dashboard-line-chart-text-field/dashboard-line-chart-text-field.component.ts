import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {
    AbstractDashboardLineChartTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-dashboard-line-chart-text-field',
    templateUrl: './dashboard-line-chart-text-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DashboardLineChartTextFieldComponent extends AbstractDashboardLineChartTextFieldComponent {

    constructor(translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>) {
        super(translate, dataFieldPortalData);
    }

}
