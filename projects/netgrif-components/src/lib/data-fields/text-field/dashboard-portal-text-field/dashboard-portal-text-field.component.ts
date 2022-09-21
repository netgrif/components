import {Component, Injector, OnInit} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {
    AbstractDashboardPortalTextFieldComponent,
    DashboardPortalComponentRegistryService,
    NAE_VIEW_ID_SEGMENT
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-dashboard-portal-text-field',
    templateUrl: './dashboard-portal-text-field.component.html',
    styleUrls: ['./dashboard-portal-text-field.component.scss']
})
export class DashboardPortalTextFieldComponent extends AbstractDashboardPortalTextFieldComponent implements OnInit {
    componentPortal: ComponentPortal<any>;

    constructor(translate: TranslateService, private registry: DashboardPortalComponentRegistryService, private injector: Injector) {
        super(translate);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.componentPortal = this.registry.get(this.card?.componentName, this.injector);
    }
}
