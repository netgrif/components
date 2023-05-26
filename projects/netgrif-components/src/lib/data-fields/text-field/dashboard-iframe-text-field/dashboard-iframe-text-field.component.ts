import {Component} from '@angular/core';
import {AbstractDashboardIframeTextFieldComponent} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-dashboard-iframe-text-field',
    templateUrl: './dashboard-iframe-text-field.component.html',
    styleUrls: ['./dashboard-iframe-text-field.component.scss']
})
export class DashboardIframeTextFieldComponent extends AbstractDashboardIframeTextFieldComponent {

    constructor(translate: TranslateService) {
        super(translate);
    }

}
