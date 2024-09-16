import {AfterViewInit, Component, Inject, Injector, OnDestroy, Optional, Type} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {ComponentPortal} from "@angular/cdk/portal";
import {MultichoiceField} from '../models/multichoice-field';
import {AbstractCaseRefBaseFieldComponent} from '../../case-ref-field/model/abstract-case-ref-base-field-component';
import {Subscription} from 'rxjs';
import {NAE_CASE_REF_CREATE_CASE, NAE_CASE_REF_SEARCH} from '../../case-ref-field/model/case-ref-injection-tokens';
import {TranslateService} from "@ngx-translate/core";
import {EnumerationField} from "../../enumeration-field/models/enumeration-field";
import {ValidationRegistryService} from "../../../registry/validation-registry.service";

@Component({
    selector: 'ncc-abstract-case-ref-default',
    template: ''
})
export abstract class AbstractMultichoiceCaseRefComponent extends AbstractCaseRefBaseFieldComponent<MultichoiceField> implements AfterViewInit, OnDestroy {

    public componentPortal: ComponentPortal<any>;
    protected _sub: Subscription;
    protected _subComp: Subscription;

    protected constructor(protected injector: Injector,
                          protected caseViewType: Type<any>,
                          _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>,
                          _validationRegistryService: ValidationRegistryService) {
        super(injector, caseViewType, dataFieldPortalData, _validationRegistryService);
    }

    ngAfterViewInit(): void {
        this.callCreateFilter();
        this._sub = this.dataField.updatedChoices.subscribe(() => {
            this.callCreateFilter();
        });
        this._subComp = this.dataField.componentChange$().subscribe(() => {
            this.callCreateFilter();
        });
    }

    protected callCreateFilter() {
        this.createFilter(this.dataField.choices.length > 0 ? this.dataField.choices.map(value => value.key) : '');
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._sub.unsubscribe();
        this._subComp.unsubscribe();
    }
}
