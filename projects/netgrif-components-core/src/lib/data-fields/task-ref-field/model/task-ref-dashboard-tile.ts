import {DataGroup} from '../../../resources/interface/data-groups';

export interface TaskRefDashboardTile {
    dataGroups: Array<DataGroup>
    x?: number;
    y?: number;
    rows?: number;
    cols?: number;
    isEmpty?: boolean;
}
