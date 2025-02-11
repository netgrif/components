import {Component, Inject} from '@angular/core';
import {
    DataGroup,
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
    GroupNavigationConstants,
    hasView
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
        this.tabs = this.getTabs();
    }

    protected getTabs(): TabContent[] {
        const menuItemDataGroups: Array<DataGroup> = this._navigationItemTaskData.slice(0, 4)
        const viewDataGroups: Array<DataGroup> = this._navigationItemTaskData.slice(4, this._navigationItemTaskData.length);

        const viewType: string = extractFieldValueFromData(menuItemDataGroups, "view_configuration_type")
        switch (viewType) {
            case "tabbed_case_view":
                return this.getCaseTabs(menuItemDataGroups, viewDataGroups);
            case "tabbed_task_view":
                return this.getTaskTabs(menuItemDataGroups, viewDataGroups);
            default:
                throw new Error(`Cannot resolve tabs for '${viewType}' view type`);
        }
    }

    protected getCaseTabs(menuItemDataGroups: Array<DataGroup>, viewDataGroups: Array<DataGroup>): TabContent[] {
        const labelData = extractIconAndTitle(menuItemDataGroups, this.translationService);

        const blockNetsString = extractFieldValueFromData<string>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_CASE_BANNED_PROCESS_CREATION);
        const blockNets = blockNetsString === undefined ? [] : blockNetsString.split(',')
        const createCaseButtonTitle: string = extractFieldValueFromData<string>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_TITLE);
        const createCaseButtonIcon: string = extractFieldValueFromData<string>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_ICON);
        const requireTitle: boolean = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_CASE_TITLE_IN_CREATION);
        const showCreateCaseButton: boolean = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_SHOW_CREATE_CASE_BUTTON);
        const newCaseButtonConfig: NewCaseCreationConfigurationData = {
            enableCaseTitle: requireTitle,
            isCaseTitleRequired: requireTitle,
            newCaseButtonConfig: {
                createCaseButtonTitle,
                createCaseButtonIcon,
                showCreateCaseButton: showCreateCaseButton,
            },
            blockNets: blockNets
        };
        const caseSearchType = extractSearchTypeFromData(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_CASE_VIEW_SEARCH_TYPE);
        const caseSearchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: caseSearchType === SearchMode.ADVANCED,
            initialSearchMode: (caseSearchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const caseShowMoreMenu = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_CASE_SHOW_MORE_MENU);
        const caseViewHeadersChangeable = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_CHANGEABLE);
        const caseViewHeadersMode = extractFieldValueFromData<string[]>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_MODE);
        const caseViewAllowTableMode = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_CASE_ALLOW_TABLE_MODE);
        const caseViewDefaultHeadersMode = extractFieldValueFromData<string[]>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_CASE_DEFAULT_HEADERS_MODE);

        if (!hasView(viewDataGroups)) {
            throw new Error(`Case view has missing configuration for task view.`);
        }

        const taskSearchType = extractSearchTypeFromData(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_VIEW_SEARCH_TYPE);
        const taskShowMoreMenu = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_SHOW_MORE_MENU);
        const taskSearchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: taskSearchType === SearchMode.ADVANCED,
            initialSearchMode: (taskSearchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const taskViewHeadersChangeable = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_CHANGEABLE);
        const taskViewHeadersMode = extractFieldValueFromData<string[]>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_MODE);
        const taskViewAllowTableMode = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_ALLOW_TABLE_MODE);
        const taskViewDefaultHeadersMode = extractFieldValueFromData<string[]>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_DEFAULT_HEADERS_MODE);
        const taskViewAdditionalFilter = this.extractionService.extractCompleteAdditionalFilterFromData(viewDataGroups);
        const mergeWithBaseFilter = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_MERGE_FILTERS);
        const additionalAllowedNets = this.extractionService.extractAdditionalFilterAllowedNets(viewDataGroups)?.allowedNetsIdentifiers;

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

    private getTaskTabs(menuItemDataGroups: Array<DataGroup>, viewDataGroups: Array<DataGroup>): TabContent[] {
        const labelData = extractIconAndTitle(menuItemDataGroups, this.translationService);
        const taskSearchType = extractSearchTypeFromData(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_VIEW_SEARCH_TYPE);
        const headersChangeable = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_CHANGEABLE);
        const headersMode = extractFieldValueFromData<string[]>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_MODE);
        const allowTableMode = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_ALLOW_TABLE_MODE);
        const defaultHeadersMode = extractFieldValueFromData<string[]>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_DEFAULT_HEADERS_MODE);
        const showToggleButton = taskSearchType === SearchMode.ADVANCED
        const searchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: showToggleButton,
            initialSearchMode: (taskSearchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const showMoreMenu = extractFieldValueFromData<boolean>(viewDataGroups, GroupNavigationConstants.ITEM_FIELD_ID_TASK_SHOW_MORE_MENU);

        const filter = this.extractionService.extractCompleteFilterFromData(viewDataGroups);
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
