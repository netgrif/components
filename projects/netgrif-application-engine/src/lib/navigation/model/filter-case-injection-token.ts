import {InjectionToken} from '@angular/core';
import {DataGroup} from '../../resources/public-api';

/**
 * Holds a navigation item task data containing the aggregated data describing the navigation item
 */
export const NAE_NAVIGATION_ITEM_TASK_DATA = new InjectionToken<Array<DataGroup>>('NaeNavigationItemTaskData');
