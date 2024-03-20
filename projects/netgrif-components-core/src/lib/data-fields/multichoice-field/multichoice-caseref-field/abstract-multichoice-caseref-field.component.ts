import {AfterViewInit, Component, Inject, Injector, Optional, Type} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {ComponentPortal} from "@angular/cdk/portal";
import {MultichoiceField} from '../models/multichoice-field';
import {AbstractCaseRefBaseFieldComponent} from '../../case-ref-field/model/abstract-case-ref-base-field-component';

@Component({
    selector: 'ncc-abstract-case-ref-default',
    template: ''
})
export abstract class AbstractMultichoiceCaseRefComponent extends AbstractCaseRefBaseFieldComponent<MultichoiceField> implements AfterViewInit {

    public componentPortal: ComponentPortal<any>;

    protected constructor(protected injector: Injector,
                          protected caseViewType: Type<any>,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(injector, caseViewType, dataFieldPortalData);
    }

    ngAfterViewInit(): void {
        this.createFilter(this.dataField.choices.length > 0 ? this.dataField.choices.map(value => value.key) : '');
        this.dataField.updatedChoices.subscribe(() => {
            this.createFilter(this.dataField.choices.length > 0 ? this.dataField.choices.map(value => value.key) : '');
        });
    }

}
