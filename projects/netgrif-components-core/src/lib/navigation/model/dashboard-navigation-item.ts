import {NavigationItem} from './navigation-configs';
import {Case} from '../../resources/interface/case';

export interface DashboardNavigationItem extends NavigationItem {
    id: string;
    showCounter: boolean,
    resource?: Case;
}
