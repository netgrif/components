import {
    InjectedTabbedCaseViewData,
    DataGroup,
    NewCaseCreationConfigurationData,
    SearchComponentConfiguration,
    SimpleFilter
} from '@netgrif/components-core';

/**
 * A variation of {@link InjectedTabbedCaseViewData} that contain the task data of a navigation item task.
 *
 * It is used to resolve filter and visual attributes of dynamic navigation views
 */
export interface InjectedTabbedCaseViewDataWithNavigationItemTaskData extends InjectedTabbedCaseViewData {
    navigationItemTaskData: Array<DataGroup>;

    newCaseButtonConfiguration: NewCaseCreationConfigurationData;
    caseViewSearchTypeConfiguration: SearchComponentConfiguration;
    caseViewShowMoreMenu: boolean;
    caseViewHeadersChangeable: boolean;
    caseViewHeadersMode: string[];
    caseViewAllowTableMode: boolean;
    caseViewDefaultHeadersMode: string;

    taskViewSearchTypeConfiguration: SearchComponentConfiguration;
    taskViewShowMoreMenu: boolean;
    taskViewMergeWithBaseFilter: boolean;
    taskViewAdditionalFilter: SimpleFilter;
    taskViewAdditionalAllowedNets: string[];
    taskViewHeadersChangeable: boolean;
    taskViewHeadersMode: string[];
    taskViewAllowTableMode: boolean;
    taskViewDefaultHeadersMode: string;
}
