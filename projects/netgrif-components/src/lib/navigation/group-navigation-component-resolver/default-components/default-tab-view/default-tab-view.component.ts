import {Component, Inject} from '@angular/core';
import {
    DataGroup,
    extractFilterFromData,
    extractIconAndTitle,
    extractSearchTypeFromData,
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
        const labelData = extractIconAndTitle(this._navigationItemTaskData);
        const createCaseButtonTitle: string = this._navigationItemTaskData[1]?.fields
            .find(field => field.stringId === GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_TITLE)?.value;
        const createCaseButtonIcon: string = this._navigationItemTaskData[1].fields
            .find(field => field.stringId === GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_ICON)?.value;
        const newCaseButtonConfig: NewCaseCreationConfigurationData = {
            enableCaseTitle: true,
            isCaseTitleRequired: true,
            newCaseButtonConfig: {
                createCaseButtonTitle,
                createCaseButtonIcon
            }
        };
        const caseSearchType = extractSearchTypeFromData(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_VIEW_SEARCH_TYPE);
        const caseSearchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: caseSearchType === SearchMode.ADVANCED,
            initialSearchMode: (caseSearchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const taskSearchType = extractSearchTypeFromData(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_VIEW_SEARCH_TYPE);
        const taskSearchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: taskSearchType === SearchMode.ADVANCED,
            initialSearchMode: (taskSearchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
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
                    taskViewSearchTypeConfiguration: taskSearchTypeConfig
                }
            }
        ];
    }

    private getTaskTabs(): TabContent[] {
        const labelData = extractIconAndTitle(this._navigationItemTaskData);
        const taskSearchType = extractSearchTypeFromData(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_VIEW_SEARCH_TYPE);
        const showToggleButton = taskSearchType === SearchMode.ADVANCED
        const searchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: showToggleButton,
            initialSearchMode: (taskSearchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const filter = this.extractionService.extractCompleteFilterFromData(this._navigationItemTaskData);
        return [
            {
                label: {text: labelData.name, icon: labelData.icon},
                canBeClosed: false,
                tabContentComponent: DefaultTabbedTaskViewComponent,
                injectedObject: {
                    navigationItemTaskData: this._navigationItemTaskData,
                    baseFilter: filter,
                    taskViewSearchTypeConfiguration: searchTypeConfig
                }
            }
        ];
    }

}
