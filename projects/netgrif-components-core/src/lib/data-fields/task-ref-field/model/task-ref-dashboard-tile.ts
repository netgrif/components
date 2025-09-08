import {LayoutContainer} from '../../../resources/interface/layout-container';

export interface TaskRefDashboardTile {
    dataGroups: LayoutContainer;
    x?: number;
    y?: number;
    rows?: number;
    cols?: number;
    isEmpty?: boolean;
}
