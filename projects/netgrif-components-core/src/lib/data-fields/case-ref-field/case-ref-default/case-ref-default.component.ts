import {AfterViewInit, Component, Inject, Injector, OnDestroy, Optional, Type} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {CaseRefField} from '../model/case-ref-field';
import {Subscription} from 'rxjs';
import {AbstractCaseRefBaseFieldComponent} from '../model/abstract-case-ref-base-field-component';

@Component({
    selector: 'ncc-abstract-case-ref-default',
    template: ''
})
export abstract class AbstractCaseRefDefaultComponent extends AbstractCaseRefBaseFieldComponent<CaseRefField> implements AfterViewInit, OnDestroy {

    protected _sub: Subscription;

    protected constructor(protected injector: Injector,
                          protected caseViewType: Type<any>,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<CaseRefField>) {
        super(injector, caseViewType, dataFieldPortalData);
    }

    ngAfterViewInit(): void {
        this.createFilter(this.dataField.value.length > 0 ? this.dataField.value : '');
        this._sub = this.dataField.valueChanges().subscribe(() => {
            this.createFilter(this.dataField.value.length > 0 ? this.dataField.value : '');
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._sub.unsubscribe();
    }

}
