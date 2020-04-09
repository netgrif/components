import {DashboardCard} from './dashboard-card';
import {DashboardCardTypes} from './dashboard-card-types';

export interface GraphCard extends DashboardCard {
    type: DashboardCardTypes.GRAPH;
}
