import {InjectionToken} from '@angular/core';
import {DataField} from '../../data-fields/models/abstract-data-field';

/**
 * Holds a navigation item task data containing the aggregated data describing the navigation item
 */
export const NAE_NAVIGATION_ITEM_TASK_DATA = new InjectionToken<Array<DataField<any>>>('NaeNavigationItemTaskData');
