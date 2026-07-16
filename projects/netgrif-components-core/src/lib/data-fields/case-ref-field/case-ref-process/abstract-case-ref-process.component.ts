import {Component, Inject, Injector, Optional, Type} from '@angular/core';
import {CaseRefField} from '../model/case-ref-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from '../../models/data-field-portal-data-injection-token';
import {AbstractBaseDataFieldComponent} from '../../base-component/abstract-base-data-field.component';
import {ComponentPortal} from '@angular/cdk/portal';

@Component({
    selector: 'ncc-abstract-case-ref-process',
    template: ''
})
export abstract class AbstractCaseRefProcessComponent extends AbstractBaseDataFieldComponent<CaseRefField> {

    public componentPortal: ComponentPortal<any>;

    protected constructor(protected injector: Injector,
                          protected builderComponent: Type<any>,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<CaseRefField>) {
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
