import {Component, OnInit} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {AbstractDashboardPortalTextFieldComponent} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {EmailSubmissionFormComponent} from '../../../forms/email-submission/email-submission-form.component';

@Component({
    selector: 'nc-dashboard-portal-text-field',
    templateUrl: './dashboard-portal-text-field.component.html',
    styleUrls: ['./dashboard-portal-text-field.component.scss']
})
export class DashboardPortalTextFieldComponent extends AbstractDashboardPortalTextFieldComponent implements OnInit {
    componentPortal: ComponentPortal<any>;

    constructor(translate: TranslateService) {
        super(translate);
    }

    ngOnInit(): void {
        super.ngOnInit();
        // TODO: replace with component repository
        if (this.card?.componentName === 'email') {
            this.componentPortal = new ComponentPortal<any>(EmailSubmissionFormComponent);
        }
    }
}
