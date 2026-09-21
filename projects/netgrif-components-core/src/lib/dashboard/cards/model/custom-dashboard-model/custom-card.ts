import {DashboardCard} from '../dashboard-card';
import {CaseSearchRequestBody} from '../../../../filter/models/case-search-request-body';
import {TaskSearchRequestBody} from '../../../../filter/models/task-search-request-body';
import {FilterType} from '../../../../filter/models/filter-type';
import {AggregationQuery} from './aggregation-query';

export interface CustomCard extends DashboardCard {
    title?: string;
    query?: AggregationQuery;
    componentName?: string;
    units?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    resourceType?: FilterType;
    filter?: CaseSearchRequestBody | TaskSearchRequestBody;
}
