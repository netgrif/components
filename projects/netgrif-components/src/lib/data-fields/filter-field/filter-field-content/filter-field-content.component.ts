import {Component, Inject, Optional, Type} from '@angular/core';
import {
    AbstractFilterFieldContentComponent,
    SearchService,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    FilterField,
    NAE_FILTER_FIELD,
    NAE_BASE_FILTER,
    BaseFilter,
    SimpleFilter,
    NAE_SEARCH_CATEGORIES,
    Category,
    CategoryFactory,
    FilterType,
    FieldTypeResource,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES,
    NAE_DEFAULT_TASK_SEARCH_CATEGORIES,
    NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY,
    PfqlVisitor,
    DATA_FIELD_PORTAL_DATA, DataFieldPortalData
} from '@netgrif/components-core';

export function filterFieldBaseFilterFactory(filterField: FilterField): BaseFilter {
    let filterType: FilterType;
    if (filterField.filterType === FieldTypeResource.CASE_FILTER) {
        filterType = FilterType.CASE;
    } else if (filterField.filterType === FieldTypeResource.TASK_FILTER) {
        filterType = FilterType.TASK;
    }
    return {
        filter: SimpleFilter.empty(filterType)
    };
}

export function filterFieldAllowedNetsFactory(factory: AllowedNetsServiceFactory, filterField: FilterField): AllowedNetsService {
    return factory.createFromArray(filterField.allowedNets ? filterField.allowedNets : []);
}

export function filterFieldCategoriesFactory(filterField: FilterField, caseCategories: Array<Type<Category<any>>>,
                                             taskCategories: Array<Type<Category<any>>>): Array<Type<Category<any>>> {
    if (filterField.filterType === FieldTypeResource.CASE_FILTER) {
        return caseCategories;
    } else if (filterField.filterType === FieldTypeResource.TASK_FILTER) {
        return taskCategories;
    }
    return [];
}

@Component({
    selector: 'nc-filter-field-content',
    templateUrl: './filter-field-content.component.html',
    styleUrls: ['./filter-field-content.component.scss'],
    providers: [
        {provide: NAE_BASE_FILTER, useFactory: filterFieldBaseFilterFactory, deps: [NAE_FILTER_FIELD]},
        {provide: NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY, useValue: true},
        {provide: AllowedNetsService, useFactory: filterFieldAllowedNetsFactory, deps: [AllowedNetsServiceFactory, NAE_FILTER_FIELD]},
        CategoryFactory,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: filterFieldCategoriesFactory, deps: [NAE_FILTER_FIELD,
                NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_DEFAULT_TASK_SEARCH_CATEGORIES]},
        SearchService,
        PfqlVisitor
    ]
})
export class FilterFieldContentComponent extends AbstractFilterFieldContentComponent {

    constructor(@Inject(NAE_FILTER_FIELD) filterField: FilterField,
                fieldSearchService: SearchService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FilterField>) {
        super(filterField, fieldSearchService, dataFieldPortalData);
    }

}
