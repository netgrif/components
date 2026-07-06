import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilter,
    BaseAllowedNetsService,
    navigationItemTaskAllowedNetsServiceFactory,
    navigationItemTaskFilterFactory,
    FilterType,
    HeaderColumnType,
    DataGroup,
    SortChangeDescription,
    HeaderColumn,
    getCaseMetaHeaders,
    getTaskMetaHeaders,
    FilterExtractionService, GroupNavigationConstants, ProcessService, extractFieldValueFromData
} from '@netgrif/components-core';
import {InjectedTabbedCaseViewDataWithNavigationItemTaskData} from './injected-tabbed-case-view-data-with-navigation-item-task-data';
import {ActivatedRoute} from '@angular/router';
import {take, map} from "rxjs/operators";
import {of, Observable} from "rxjs";
import {SortDirection} from '@angular/material/sort';

/**
 * Converts a navigation item case task data injected by the {@link NAE_TAB_DATA} injection token into a {@link BaseFilter} instance
 * @param extractionService
 * @param tabData the injected data containing the navigation item case task data
 * @param activatedRoute
 */
export function filterCaseTabbedDataFilterFactory(extractionService: FilterExtractionService,
                                                  tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData,
                                                  activatedRoute: ActivatedRoute): BaseFilter {
    return navigationItemTaskFilterFactory(extractionService, GroupNavigationConstants.ITEM_FIELD_CASE_FILTER, activatedRoute, tabData.navigationItemTaskData, tabData.loadFilter, FilterType.CASE);
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

    return navigationItemTaskAllowedNetsServiceFactory(allowedNetsServiceFactory, baseAllowedNets, true, tabData.navigationItemTaskData);
}

// todo 2454 doc
export function buildDynamicSortChangeDescriptionForCase$(menuItemData: Array<DataGroup>, processService: ProcessService): Observable<SortChangeDescription> | undefined {
    return buildDynamicSortChangeDescription$(menuItemData, processService, 'case');
}

// todo 2454 doc
export function buildDynamicSortChangeDescriptionForTask$(menuItemData: Array<DataGroup>, processService: ProcessService): Observable<SortChangeDescription> | undefined {
    return buildDynamicSortChangeDescription$(menuItemData, processService, 'task');
}

function buildDynamicSortChangeDescription$(menuItemData: Array<DataGroup>, processService: ProcessService,
                                                   viewType: 'case' | 'task' ): Observable<SortChangeDescription> | undefined {
    const activeColumn: string = extractFieldValueFromData<string>(menuItemData,
        viewType === 'task' ? GroupNavigationConstants.ITEM_FIELD_TASK_HEADERS_SORT_MODE_ACTIVE : GroupNavigationConstants.ITEM_FIELD_CASE_HEADERS_SORT_MODE_ACTIVE);
    if (!activeColumn || activeColumn === '') {
        return undefined;
    }

    const firstDashIdx = activeColumn.indexOf('-');
    if (firstDashIdx === -1) {
        return undefined;
    }

    let direction: SortDirection = extractFieldValueFromData<SortDirection>(menuItemData,
        viewType === 'task' ? GroupNavigationConstants.ITEM_FIELD_TASK_HEADERS_SORT_MODE_DIRECTION : GroupNavigationConstants.ITEM_FIELD_CASE_HEADERS_SORT_MODE_DIRECTION);
    if (!direction) {
        direction = '';
    }

    const colTypeRaw: string = activeColumn.substring(0, firstDashIdx);
    let colType: HeaderColumnType;
    let processIdentifier: string;
    if (!!colTypeRaw && colTypeRaw === HeaderColumnType.META) {
        colType = HeaderColumnType.META
    } else if (!!colTypeRaw &&  colTypeRaw !== '') {
        processIdentifier = colTypeRaw;
        colType = HeaderColumnType.IMMEDIATE;
    }

    const colIdentifier: string = activeColumn.substring(firstDashIdx + 1, activeColumn.length);

    if (!!processIdentifier) {
        return processService.getNet(processIdentifier).pipe(
            take(1),
            map(net => {
                let fieldType: string = net.immediateData.find(data => data.stringId === colIdentifier)?.type
                return {
                    columnType: colType,
                    fieldIdentifier: colIdentifier,
                    sortDirection: direction,
                    columnIdentifier: -1,
                    fieldType: !!fieldType ? fieldType : 'text'
                }
            })
        )
    } else {
        return of({
            columnType: colType,
            fieldIdentifier: colIdentifier,
            sortDirection: direction,
            columnIdentifier: -1,
            fieldType: determineMetaFieldType(viewType, colIdentifier)
        });
    }
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
    const fieldType: string = metaFields.find(headerCol => headerCol.fieldIdentifier === colIdentifier)?.fieldType
    return !!fieldType ? fieldType : 'text';
}
