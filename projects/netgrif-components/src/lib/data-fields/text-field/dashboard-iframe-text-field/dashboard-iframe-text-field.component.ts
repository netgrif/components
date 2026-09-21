import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDashboardIframeTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-dashboard-iframe-text-field',
    templateUrl: './dashboard-iframe-text-field.component.html',
    styleUrls: ['./dashboard-iframe-text-field.component.scss']
})
export class DashboardIframeTextFieldComponent extends AbstractDashboardIframeTextFieldComponent {

    constructor(translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>) {
        super(translate, dataFieldPortalData);
    }

}
