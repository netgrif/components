import {DashboardCardTypes} from './dashboard-card-types';

export interface DashboardCard {
    x: number;
    y: number;
    width: number;
    height: number;
    type: DashboardCardTypes;
}
