import {DashboardCard} from './dashboard-card';
import {DashboardCardTypes} from './dashboard-card-types';
import {CaseSearchRequestBody} from '../../../filter/models/case-search-request-body';
import {TaskSearchRequestBody} from '../../../filter/models/task-search-request-body';
import {FilterType} from '../../../filter/models/filter-type';

export interface CountCard extends DashboardCard {
    type: DashboardCardTypes.COUNT;
    title: string;
    resourceType: FilterType;
    filter: CaseSearchRequestBody | TaskSearchRequestBody;
}
