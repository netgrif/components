import {Component, Inject} from '@angular/core';
import {
    DataGroup,
    extractFilterFromData,
    extractIconAndTitle,
    extractSearchTypeFromData,
    extractFieldValueFromData,
    FilterType,
    groupNavigationViewIdSegmentFactory,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    NAE_VIEW_ID_SEGMENT,
    NewCaseCreationConfigurationData,
    SearchComponentConfiguration,
    SearchMode,
    TabContent,
    ViewIdService,
    FilterExtractionService,
    GroupNavigationConstants
} from '@netgrif/components-core';
import {DefaultTabbedCaseViewComponent} from '../default-tabbed-case-view/default-tabbed-case-view.component';
import {DefaultTabbedTaskViewComponent} from '../default-tabbed-task-view/default-tabbed-task-view.component';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-default-tab-view',
    templateUrl: './default-tab-view.component.html',
    styleUrls: ['./default-tab-view.component.scss'],
    providers: [
        ViewIdService,
        {provide: NAE_VIEW_ID_SEGMENT, useFactory: groupNavigationViewIdSegmentFactory, deps: [ActivatedRoute]}
    ]
})
export class DefaultTabViewComponent {

    tabs: Array<TabContent>;

    constructor(@Inject(NAE_NAVIGATION_ITEM_TASK_DATA) protected _navigationItemTaskData: Array<DataGroup>,
                protected translationService: TranslateService,
                protected extractionService: FilterExtractionService) {
        const filter = extractFilterFromData(this._navigationItemTaskData);
        this.tabs = this.getTabs(filter.type);
    }

    private getTabs(type: FilterType): TabContent[] {
        switch (type) {
            case FilterType.CASE:
                return this.getCaseTabs();
            case FilterType.TASK:
                return this.getTaskTabs();
            default:
                throw new Error(`Cannot resolve tabs for '${type}' filter type`);
        }
    }

    private getCaseTabs(): TabContent[] {
        const labelData = extractIconAndTitle(this._navigationItemTaskData, this.translationService);

        const blockNets = extractFieldValueFromData<string[]>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_BANNED_PROCESS_CREATION);
        const createCaseButtonTitle: string = extractFieldValueFromData<string>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_TITLE);
        const createCaseButtonIcon: string = extractFieldValueFromData<string>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_ICON);
        const requireTitle: boolean = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_TITLE_IN_CREATION);
        const newCaseButtonConfig: NewCaseCreationConfigurationData = {
            enableCaseTitle: requireTitle,
            isCaseTitleRequired: requireTitle,
            newCaseButtonConfig: {
                createCaseButtonTitle,
                createCaseButtonIcon
            },
            blockNets: blockNets
        };
        const caseSearchType = extractSearchTypeFromData(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_VIEW_SEARCH_TYPE);
        const caseSearchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: caseSearchType === SearchMode.ADVANCED,
            initialSearchMode: (caseSearchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const caseShowMoreMenu = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_SHOW_MORE_MENU);
        const caseViewHeadersChangeable = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_CHANGEABLE);
        const caseViewHeadersMode = extractFieldValueFromData<string[]>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_MODE);
        const caseViewAllowTableMode = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_ALLOW_TABLE_MODE);
        const caseViewDefaultHeadersMode = extractFieldValueFromData<string[]>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_DEFAULT_HEADERS_MODE);

        const taskSearchType = extractSearchTypeFromData(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_VIEW_SEARCH_TYPE);
        const taskShowMoreMenu = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_SHOW_MORE_MENU);
        const taskSearchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: taskSearchType === SearchMode.ADVANCED,
            initialSearchMode: (taskSearchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const taskViewHeadersChangeable = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_CHANGEABLE);
        const taskViewHeadersMode = extractFieldValueFromData<string[]>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_MODE);
        const taskViewAllowTableMode = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_ALLOW_TABLE_MODE);
        const taskViewDefaultHeadersMode = extractFieldValueFromData<string[]>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_DEFAULT_HEADERS_MODE);
        const taskViewAdditionalFilter = this.extractionService.extractCompleteAdditionalFilterFromData(this._navigationItemTaskData);
        const mergeWithBaseFilter = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_MERGE_FILTERS);
        const additionalAllowedNets = this.extractionService.extractAdditionalFilterAllowedNets(this._navigationItemTaskData)?.allowedNetsIdentifiers;

        return [
            {
                label: {text: labelData.name, icon: labelData.icon},
                canBeClosed: false,
                tabContentComponent: DefaultTabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: DefaultTabbedTaskViewComponent,
                    tabViewOrder: 0,
                    navigationItemTaskData: this._navigationItemTaskData,

                    newCaseButtonConfiguration: newCaseButtonConfig,
                    caseViewSearchTypeConfiguration: caseSearchTypeConfig,
                    caseViewShowMoreMenu: caseShowMoreMenu,
                    caseViewHeadersChangeable: caseViewHeadersChangeable,
                    caseViewHeadersMode: caseViewHeadersMode,
                    caseViewAllowTableMode: caseViewAllowTableMode,
                    caseViewDefaultHeadersMode: caseViewDefaultHeadersMode,

                    taskViewSearchTypeConfiguration: taskSearchTypeConfig,
                    taskViewShowMoreMenu: taskShowMoreMenu,
                    taskViewHeadersChangeable: taskViewHeadersChangeable,
                    taskViewHeadersMode: taskViewHeadersMode,
                    taskViewAllowTableMode: taskViewAllowTableMode,
                    taskViewDefaultHeadersMode: taskViewDefaultHeadersMode,
                    taskViewMergeWithBaseFilter: mergeWithBaseFilter,
                    taskViewAdditionalFilter: taskViewAdditionalFilter,
                    taskViewAdditionalAllowedNets: additionalAllowedNets
                }
            }
        ];
    }

    private getTaskTabs(): TabContent[] {
        const labelData = extractIconAndTitle(this._navigationItemTaskData, this.translationService);
        const taskSearchType = extractSearchTypeFromData(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_VIEW_SEARCH_TYPE);
        const headersChangeable = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_CHANGEABLE);
        const headersMode = extractFieldValueFromData<string[]>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_MODE);
        const allowTableMode = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_ALLOW_TABLE_MODE);
        const defaultHeadersMode = extractFieldValueFromData<string[]>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_DEFAULT_HEADERS_MODE);
        const showToggleButton = taskSearchType === SearchMode.ADVANCED
        const searchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: showToggleButton,
            initialSearchMode: (taskSearchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const showMoreMenu = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_SHOW_MORE_MENU);

        const filter = this.extractionService.extractCompleteFilterFromData(this._navigationItemTaskData);
        return [
            {
                label: {text: labelData.name, icon: labelData.icon},
                canBeClosed: false,
                tabContentComponent: DefaultTabbedTaskViewComponent,
                injectedObject: {
                    navigationItemTaskData: this._navigationItemTaskData,
                    baseFilter: filter,
                    searchTypeConfiguration: searchTypeConfig,
                    showMoreMenu: showMoreMenu,
                    headersChangeable: headersChangeable,
                    headersMode: headersMode,
                    allowTableMode: allowTableMode,
                    defaultHeadersMode: defaultHeadersMode
                }
            }
        ];
    }

}
