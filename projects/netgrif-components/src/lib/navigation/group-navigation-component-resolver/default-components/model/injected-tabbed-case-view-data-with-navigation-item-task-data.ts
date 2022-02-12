import {InjectedTabbedCaseViewData, DataGroup} from '@netgrif/components-core';

/**
 * A variation of {@link InjectedTabbedCaseViewData} that contain the task data of a navigation item task.
 *
 * It is used to resolve filter and visual attributes of dynamic navigation views
 */
export interface InjectedTabbedCaseViewDataWithNavigationItemTaskData extends InjectedTabbedCaseViewData {
    navigationItemTaskData: Array<DataGroup>;
}
