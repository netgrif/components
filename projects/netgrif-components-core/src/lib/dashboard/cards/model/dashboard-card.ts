import {DashboardCardTypes} from './dashboard-card-types';
import {GridElement} from '../../../utility/grid-layout/model/grid-element';
import {ComponentPortal} from '@angular/cdk/portal';


export interface DashboardCard extends GridElement {
    type: DashboardCardTypes;
    portalComponent?: ComponentPortal<any>;
}
