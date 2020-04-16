import {DashboardCard} from './dashboard-card';
import {DashboardCardTypes} from './dashboard-card-types';

export interface CountCard extends DashboardCard {
    type: DashboardCardTypes.COUNT;
    title: string;
    resourceType: 'task' | 'case';
    filter: string;
}
