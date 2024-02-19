import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDashboardLineChartTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextField,
    ValidationRegistryService
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
                _validationRegistry: ValidationRegistryService) {
        super(translate, dataFieldPortalData, _validationRegistry);
    }

}
