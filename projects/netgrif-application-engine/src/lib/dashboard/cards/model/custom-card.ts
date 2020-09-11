import {DashboardCard} from './dashboard-card';
import {CaseSearchRequestBody} from '../../../filter/models/case-search-request-body';
import {TaskSearchRequestBody} from '../../../filter/models/task-search-request-body';
import {FilterType} from '../../../filter/models/filter-type';

export interface CustomCard extends DashboardCard {
    title: string;
    query: string;
    units: string;
    xAxisLabel: string;
    yAxisLabel: string;
    resourceType: FilterType;
    filter: CaseSearchRequestBody | TaskSearchRequestBody;
}
