import {Component, Inject, Injector, OnDestroy, OnInit, Optional} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {
    AbstractDashboardPortalTextFieldComponent, ComponentRegistryService,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, NAE_SAVE_DATA_INFORM,
    TextField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
    selector: 'nc-dashboard-portal-text-field',
    templateUrl: './dashboard-portal-text-field.component.html',
    styleUrls: ['./dashboard-portal-text-field.component.scss']
})
export class DashboardPortalTextFieldComponent extends AbstractDashboardPortalTextFieldComponent implements OnInit, OnDestroy {
    protected _subValue: Subscription;
    public componentPortal: ComponentPortal<any>;

    constructor(translate: TranslateService,
                private registry: ComponentRegistryService,
                private injector: Injector,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean) {
        super(translate, dataFieldPortalData, _saveDataInform);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.initializePortalComponent()
        this._subValue = this.formControlRef.valueChanges.subscribe(newValue => {
            this.initializePortalComponent();
        });
    }

    protected initializePortalComponent(): void {
        this.componentPortal = this.registry.get(this.card?.componentName, this.injector);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._subValue.unsubscribe();
    }
}
