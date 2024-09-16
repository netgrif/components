import {AfterViewInit, Component, Inject, Injector, OnDestroy, Optional, Type} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {CaseRefField} from '../model/case-ref-field';
import {Subscription} from 'rxjs';
import {AbstractCaseRefBaseFieldComponent} from '../model/abstract-case-ref-base-field-component';
import {TranslateService} from "@ngx-translate/core";
import {ValidationRegistryService} from "../../../registry/validation-registry.service";

@Component({
    selector: 'ncc-abstract-case-ref-default',
    template: ''
})
export abstract class AbstractCaseRefDefaultComponent extends AbstractCaseRefBaseFieldComponent<CaseRefField> implements AfterViewInit, OnDestroy {

    protected _sub: Subscription;
    protected _subComp: Subscription;

    protected constructor(protected injector: Injector,
                          protected caseViewType: Type<any>,
                          _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<CaseRefField>,
                          _validationRegistryService: ValidationRegistryService) {
        super(injector, caseViewType, dataFieldPortalData);
    }

    ngAfterViewInit(): void {
        this.callCreateFilter();
        this._sub = this.dataField.valueChanges().subscribe(() => {
            this.callCreateFilter();
        });
        this._subComp = this.dataField.componentChange$().subscribe(() => {
            this.callCreateFilter();
        });
    }

    protected callCreateFilter() {
        this.createFilter(this.dataField.value.length > 0 ? this.dataField.value : '');
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._sub.unsubscribe();
        this._subComp.unsubscribe()
    }

}
