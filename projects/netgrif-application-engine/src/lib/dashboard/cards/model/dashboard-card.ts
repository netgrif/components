import {DashboardCardTypes} from './dashboard-card-types';
import {GridElement} from '../../../utility/grid-layout/model/grid-element';


export interface DashboardCard extends GridElement {
    type: DashboardCardTypes;
}
