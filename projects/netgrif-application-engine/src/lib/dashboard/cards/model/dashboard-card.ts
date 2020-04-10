import {DashboardCardTypes} from './dashboard-card-types';
import {GridItem} from '../../../data-fields/models/grid-item';


export interface DashboardCard extends GridItem {
    type: DashboardCardTypes;
}
