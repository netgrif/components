import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDashboardPieChartTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-dashboard-pie-chart-text-field',
    templateUrl: './dashboard-pie-chart-text-field.component.html',
    styleUrls: ['./dashboard-pie-chart-text-field.component.scss']
})
export class DashboardPieChartTextFieldComponent extends AbstractDashboardPieChartTextFieldComponent {

    constructor(translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>) {
        super(translate, validationRegistry, dataFieldPortalData);
    }

}
