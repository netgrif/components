import {AfterViewInit, Component, Inject, Injector, OnDestroy, Optional, Type} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {EnumerationField} from '../models/enumeration-field';
import {Subscription} from 'rxjs';
import {AbstractCaseRefBaseFieldComponent} from '../../case-ref-field/model/abstract-case-ref-base-field-component';

@Component({
    selector: 'ncc-abstract-case-ref-default',
    template: ''
})
export abstract class AbstractEnumerationCaseRefComponent extends AbstractCaseRefBaseFieldComponent<EnumerationField> implements AfterViewInit, OnDestroy {

    protected _sub: Subscription;

    protected constructor(protected injector: Injector,
                          protected caseViewType: Type<any>,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(injector, caseViewType, dataFieldPortalData);
    }

    ngAfterViewInit(): void {
        this.createFilter(this.dataField.choices.length > 0 ? this.dataField.choices.map(value => value.key) : '');
        this._sub = this.dataField.updatedChoices.subscribe(() => {
            this.createFilter(this.dataField.choices.length > 0 ? this.dataField.choices.map(value => value.key) : '');
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._sub.unsubscribe();
    }

}
