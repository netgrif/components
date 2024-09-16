import {AbstractBaseDataFieldComponent} from '../../base-component/abstract-base-data-field.component';
import {CaseRefField} from './case-ref-field';
import { Inject, Injector, Optional, Type} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from '../../models/data-field-portal-data-injection-token';
import {CaseSearchRequestBody} from '../../../filter/models/case-search-request-body';
import {NAE_DEFAULT_HEADERS} from '../../../header/models/default-headers-token';
import {NAE_CASE_REF_CREATE_CASE, NAE_CASE_REF_DATAFIELD, NAE_CASE_REF_SEARCH} from './case-ref-injection-tokens';
import {NAE_BASE_FILTER} from '../../../search/models/base-filter-injection-token';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {BaseFilter} from '../../../search/models/base-filter';
import {NAE_VIEW_ID_SEGMENT} from '../../../user/models/view-id-injection-tokens';
import {ViewIdService} from '../../../user/services/view-id.service';
import {DataField} from '../../models/abstract-data-field';
import {ValidationRegistryService} from "../../../registry/validation-registry.service";

export abstract class AbstractCaseRefBaseFieldComponent<T extends DataField<unknown>> extends AbstractBaseDataFieldComponent<T> {

    public componentPortal: ComponentPortal<any>;

    protected constructor(protected injector: Injector,
                          protected caseViewType: Type<any>,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>,
                          _validationRegistry: ValidationRegistryService,) {
        super(null, dataFieldPortalData);
    }

    createFilter(filterValue: string | string[]) {
        let portalInjector;
        const filterProperty: boolean = this.dataField?.component?.properties?.filter === 'true';
        let query: CaseSearchRequestBody;
        if (filterProperty) {
            query = JSON.parse(this.dataField?.component?.properties?.filterQuery) as CaseSearchRequestBody;
        }
        let providers = [
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
                useValue: { filter: SimpleFilter.fromCaseQuery((filterProperty && query ? query : {stringId: filterValue})) } as BaseFilter
            },
            {
                provide: NAE_VIEW_ID_SEGMENT,
                useValue: this.dataField.parentCaseId + '_' + this.dataField.parentTaskId + '_' + this.dataField.stringId
            },
            { provide: ViewIdService, useClass: ViewIdService }
        ];
        if (this.dataField instanceof CaseRefField) {
            providers.push({
                provide: NAE_CASE_REF_DATAFIELD,
                useValue: this.dataField
            })
        }
        portalInjector = Injector.create({
            providers,
            parent: this.injector
        });
        this.componentPortal = new ComponentPortal(this.caseViewType, null, portalInjector);
    }
}

