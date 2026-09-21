import {
    DataGroup,
    InjectedTabbedTaskViewData,
    SearchComponentConfiguration
} from '@netgrif/components-core';

/**
 * A variation of {@link InjectedTabbedCaseViewData} that contain the task data of a navigation item task.
 *
 * It is used to resolve filter and visual attributes of dynamic navigation views
 */
export interface InjectedTabbedTaskViewDataWithNavigationItemTaskData extends InjectedTabbedTaskViewData {
    navigationItemTaskData: Array<DataGroup>;
    searchTypeConfiguration: SearchComponentConfiguration;
    showMoreMenu: boolean,
    headersChangeable: boolean;
    headersMode: string[];
    allowTableMode: boolean;
    defaultHeadersMode: string;
}
