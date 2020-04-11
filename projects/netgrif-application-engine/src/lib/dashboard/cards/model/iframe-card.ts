import {DashboardCard} from './dashboard-card';
import {DashboardCardTypes} from './dashboard-card-types';

export interface IframeCard extends DashboardCard {
    type: DashboardCardTypes.IFRAME;
    url: string;
}
