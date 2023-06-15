import {DataGroup} from '../../resources/interface/data-groups';

export interface PreprocessedDataGroups {
    dataGroups: Array<DataGroup>;
    containsDashboardTaskRef: boolean;
}
