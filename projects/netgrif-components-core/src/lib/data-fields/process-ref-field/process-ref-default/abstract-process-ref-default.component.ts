import {Component, Inject, Injector, Optional, Type, ChangeDetectionStrategy} from '@angular/core';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from '../../models/data-field-portal-data-injection-token';
import {AbstractBaseDataFieldComponent} from '../../base-component/abstract-base-data-field.component';
import {ComponentPortal} from '@angular/cdk/portal';
import {ProcessRefField} from '../model/process-ref-field';

@Component({
    selector: 'ncc-abstract-process-ref-default',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractProcessRefDefaultComponent extends AbstractBaseDataFieldComponent<ProcessRefField> {

    public componentPortal: ComponentPortal<any>;

    protected constructor(protected injector: Injector,
                          protected builderComponent: Type<any>,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<ProcessRefField>) {
        super(dataFieldPortalData);
    }

    createPortal() {
        const portalInjector = Injector.create({
            providers: [],
            parent: this.injector
        });
        this.componentPortal = new ComponentPortal(this.builderComponent, null, portalInjector);
    }
}
