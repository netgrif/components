import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseAllowedNetsService,
    BaseFilter,
    Category,
    CategoryResolverService,
    DataGroup,
    extractFieldValueFromData,
    FilterExtractionService,
    getCaseMetaHeaders,
    getTaskMetaHeaders,
    GroupNavigationConstants,
    HeaderColumn,
    HeaderColumnType,
    ImmediateData,
    navigationItemTaskAllowedNetsServiceFactory,
    navigationItemTaskCategoryFactory,
    navigationItemTaskFilterFactory,
    ProcessService,
    SortChangeDescription,
} from '@netgrif/components-core';
import {InjectedTabbedCaseViewDataWithNavigationItemTaskData} from './injected-tabbed-case-view-data-with-navigation-item-task-data';
import {Type} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SortDirection} from '@angular/material/sort';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Converts a navigation item case task data injected by the {@link NAE_TAB_DATA} injection token into a {@link BaseFilter} instance
 * @param extractionService
 * @param tabData the injected data containing the navigation item case task data
 * @param activatedRoute
 */
export function filterCaseTabbedDataFilterFactory(extractionService: FilterExtractionService,
                                                  tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData,
                                                  activatedRoute: ActivatedRoute): BaseFilter {
    return navigationItemTaskFilterFactory(extractionService, activatedRoute, tabData.navigationItemTaskData);
}

/**
 * Converts a navigation item case task data injected by the {@link NAE_TAB_DATA} injection token into an {@link AllowedNetsService}
 * instance
 * @param allowedNetsServiceFactory
 * @param baseAllowedNets
 * @param tabData the injected data containing the navigation item case task data
 */
export function filterCaseTabbedDataAllowedNetsServiceFactory(allowedNetsServiceFactory: AllowedNetsServiceFactory,
                                                              baseAllowedNets: BaseAllowedNetsService,
                                                              tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData)
    : AllowedNetsService {

    return navigationItemTaskAllowedNetsServiceFactory(allowedNetsServiceFactory, baseAllowedNets, tabData.navigationItemTaskData);
}

/**
 * Converts a navigation item case task data injected by the {@link NAE_TAB_DATA} injection token into an array of {@link Category} classes
 * @param categoryResolverService
 * @param tabData the injected data containing the navigation item case task data
 * @param defaultCaseSearchCategories the default case search categories
 * @param defaultTaskSearchCategories the default task search categories
 */
export function filterCaseTabbedDataSearchCategoriesFactory(categoryResolverService: CategoryResolverService,
                                                            tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData,
                                                            defaultCaseSearchCategories: Array<Type<Category<any>>>,
                                                            defaultTaskSearchCategories: Array<Type<Category<any>>>)
    : Array<Type<Category<any>>> {

    return navigationItemTaskCategoryFactory(categoryResolverService,
        tabData.navigationItemTaskData,
        defaultCaseSearchCategories,
        defaultTaskSearchCategories);
}

/**
 * Builds {@link SortChangeDescription} based on dynamic menu item data for case view. This can be used for default
 * sorting when the view is being initialized
 *
 * @return Observable of sort change description or undefined if the data is wrong or no data provided
 */
export function buildDynamicSortChangeDescriptionForCase$(menuItemData: Array<DataGroup>, processService: ProcessService): Observable<SortChangeDescription[]> | undefined {
    return buildDynamicSortChangeDescription$(menuItemData, processService, 'case');
}

/**
 * Builds {@link SortChangeDescription} based on dynamic menu item data for task view. This can be used for default
 * sorting when the view is being initialized
 *
 * @return Observable of sort change description or undefined if the data is wrong or no data provided
 */
export function buildDynamicSortChangeDescriptionForTask$(menuItemData: Array<DataGroup>, processService: ProcessService): Observable<SortChangeDescription[]> | undefined {
    return buildDynamicSortChangeDescription$(menuItemData, processService, 'task');
}

function buildDynamicSortChangeDescription$(menuItemData: Array<DataGroup>, processService: ProcessService,
                                            viewType: 'case' | 'task'): Observable<SortChangeDescription[]> | undefined {
    if (!menuItemData || menuItemData.length === 0) {
        return undefined;
    }

    const processDataCache: Map<string, ImmediateData[]> = new Map<string, ImmediateData[]>;

    let activeColumnsRaw: string | undefined;
    let direction: SortDirection = '';
    try {
        activeColumnsRaw = extractFieldValueFromData<string>(menuItemData,
            viewType === 'task' ? GroupNavigationConstants.ITEM_FIELD_TASK_HEADERS_SORT_MODE_ACTIVE : GroupNavigationConstants.ITEM_FIELD_CASE_HEADERS_SORT_MODE_ACTIVE);
        direction = extractFieldValueFromData<SortDirection>(menuItemData,
            viewType === 'task' ? GroupNavigationConstants.ITEM_FIELD_TASK_HEADERS_SORT_MODE_DIRECTION : GroupNavigationConstants.ITEM_FIELD_CASE_HEADERS_SORT_MODE_DIRECTION) ?? '';
    } catch (e) {
        // sort configuration fields are not part of the menu item data
        return undefined;
    }

    if (!activeColumnsRaw || activeColumnsRaw.trim() === '') {
        return undefined;
    }

    const activeColumns: string[] = activeColumnsRaw.split(',').map(col => col.trim()).filter(col => col !== '');
    if (activeColumns.length === 0) {
        return undefined;
    }

    const result: SortChangeDescription[] = [];
    for (const activeColumn of activeColumns) {
        const firstDashIdx = activeColumn.indexOf('-');
        if (firstDashIdx === -1) {
            return undefined;
        }

        const colTypeRaw: string = activeColumn.substring(0, firstDashIdx);
        let colType: HeaderColumnType;
        let processIdentifier: string;
        if (!!colTypeRaw && colTypeRaw === HeaderColumnType.META) {
            colType = HeaderColumnType.META;
        } else if (!!colTypeRaw && colTypeRaw !== '') {
            processIdentifier = colTypeRaw;
            colType = HeaderColumnType.IMMEDIATE;
        }

        const colIdentifier: string = activeColumn.substring(firstDashIdx + 1, activeColumn.length);

        if (!!processIdentifier) {
            let immediateData: ImmediateData[] = processDataCache.get(processIdentifier);
            if (!!immediateData) {
                result.push(createSortChangeDescription(immediateData.find(data => data.stringId === colIdentifier)?.type, colType, colIdentifier, direction));
                continue;
            }
            processService.getNet(processIdentifier).pipe(
                map(net => {
                    processDataCache[processIdentifier] = net.immediateData;
                    result.push(createSortChangeDescription(net.immediateData.find(data => data.stringId === colIdentifier)?.type, colType, colIdentifier, direction));
                })
            );
        } else {
            result.push(
                createSortChangeDescription(determineMetaFieldType(viewType, colIdentifier), colType, colIdentifier, direction));
        }
    }
    return of(result);
}

function createSortChangeDescription(fieldType: string, colType: HeaderColumnType, colIdentifier: string, direction: SortDirection) {
    return {
        columnType: colType,
        fieldIdentifier: colIdentifier,
        sortDirection: direction,
        columnIdentifier: -1,
        fieldType: !!fieldType ? fieldType : 'text'
    };
}

function determineMetaFieldType(viewType: 'case' | 'task', colIdentifier: string): string {
    let metaFields: HeaderColumn[];
    if (viewType === 'case') {
        metaFields = getCaseMetaHeaders();
    } else if (viewType === 'task') {
        metaFields = getTaskMetaHeaders();
    }
    if (!metaFields) {
        return 'text';
    }
    const fieldType: string = metaFields.find(headerCol => headerCol.fieldIdentifier === colIdentifier)?.fieldType;
    return !!fieldType ? fieldType : 'text';
}
