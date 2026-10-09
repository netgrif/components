import {InjectionToken} from '@angular/core';
import {SortChangeDescription} from '../../../header/models/user-changes/sort-change-description';

export const NAE_DYNAMIC_DEFAULT_SORT = new InjectionToken<Array<SortChangeDescription[]>>('NaeDynamicDefaultSort');
