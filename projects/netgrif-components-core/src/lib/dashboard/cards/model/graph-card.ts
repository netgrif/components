import {DashboardCard} from './dashboard-card';
import {DashboardCardTypes} from './dashboard-card-types';

// TODO 14.4.2020 - implement graph dashboard card

export interface GraphCard extends DashboardCard {
    type: DashboardCardTypes.GRAPH;
}
