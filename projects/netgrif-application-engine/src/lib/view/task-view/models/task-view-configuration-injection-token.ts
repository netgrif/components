import {InjectionToken} from '@angular/core';
import {TaskViewConfiguration} from './task-view-configuration';
import {InjectedTabbedTaskViewData} from './injected-tabbed-task-view-data';
import {of} from 'rxjs';

export const NAE_TASK_VIEW_CONFIGURATION = new InjectionToken<TaskViewConfiguration>('NaeTaskViewConfiguration');

/**
 * Convenience method that can be used as a task view configuration object factory for tabbed task views.
 *
 * If the injected tab data contain information that is included in the {@link TaskViewConfiguration} interface,
 * this factory will forward this information into the provided object.
 *
 * @param injectedTabData
 */
export function tabbedTaskViewConfigurationFactory(injectedTabData: InjectedTabbedTaskViewData): TaskViewConfiguration {
    if (injectedTabData?.initiallyOpenOneTask !== undefined) {
        return {initiallyOpenOneTask: of(injectedTabData.initiallyOpenOneTask)};
    } else {
        return {};
    }
}
