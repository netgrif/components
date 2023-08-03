import {AfterViewInit, Component, Inject, Injector, Optional, Type} from "@angular/core";
import {NAE_BASE_FILTER} from "../../../search/models/base-filter-injection-token";
import {SimpleFilter} from "../../../filter/models/simple-filter";
import {BaseFilter} from "../../../search/models/base-filter";
import {NAE_VIEW_ID_SEGMENT} from "../../../user/models/view-id-injection-tokens";
import {ViewIdService} from "../../../user/services/view-id.service";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {ComponentPortal} from "@angular/cdk/portal";
import {NAE_DEFAULT_HEADERS} from '../../../header/models/default-headers-token';
import {MultichoiceField} from '../models/multichoice-field';
import {NAE_CASE_REF_CREATE_CASE, NAE_CASE_REF_SEARCH} from '../../case-ref-field/model/case-ref-injection-tokens';

@Component({
    selector: 'ncc-abstract-case-ref-default',
    template: ''
})
export abstract class AbstractMultichoiceCaseRefComponent extends AbstractBaseDataFieldComponent<MultichoiceField> implements AfterViewInit {

    componentPortal: ComponentPortal<any>;

    protected constructor(protected injector: Injector,
                          protected caseViewType: Type<any>,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(dataFieldPortalData);
    }

    ngAfterViewInit(): void {
        this.createFilter();
        this.dataField.valueChanges().subscribe(() => {
            this.createFilter();
        });
    }

    createFilter() {
        let portalInjector;
        const filterValue : string | string[] = this.dataField.choices.length > 0 ? this.dataField.choices.map(value => value.key) : '';
        portalInjector = Injector.create({
            providers: [
                {
                    provide: NAE_DEFAULT_HEADERS, useValue: this.dataField.component?.properties?.headers.split(',')
                },
                {
                    provide: NAE_CASE_REF_CREATE_CASE, useValue: this.dataField.component?.properties?.createCase === 'true'
                },
                {
                    provide: NAE_CASE_REF_SEARCH, useValue: this.dataField.component?.properties?.search === 'true'
                },
                {
                    provide: NAE_BASE_FILTER,
                    useValue: { filter: SimpleFilter.fromCaseQuery({stringId: filterValue}) } as BaseFilter
                },
                {
                    provide: NAE_VIEW_ID_SEGMENT,
                    useValue: this.dataField.parentCaseId + '_' + this.dataField.parentTaskId + '_' + this.dataField.stringId
                },
                { provide: ViewIdService, useClass: ViewIdService }],
            parent: this.injector
        });
        this.componentPortal = new ComponentPortal(this.caseViewType, null, portalInjector);
    }

}
