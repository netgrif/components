import {Component, Inject} from '@angular/core';
import {
    DataGroup,
    extractFilterFromData,
    extractIconAndTitle,
    extractSearchTypeFromData,
    extractCreateCaseButtonTitle,
    extractCreateCaseButtonIcon,
    extractIsMergeFromData,
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
        const createCaseButtonTitle: string = extractCreateCaseButtonTitle(this._navigationItemTaskData)
        const createCaseButtonIcon: string = extractCreateCaseButtonIcon(this._navigationItemTaskData)
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
        const taskViewAdditionalFilter = this.extractionService.extractCompleteAdditionalFilterFromData(this._navigationItemTaskData);
        const mergeWithBaseFilter = extractIsMergeFromData(this._navigationItemTaskData);

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
                    taskViewSearchTypeConfiguration: taskSearchTypeConfig,
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
