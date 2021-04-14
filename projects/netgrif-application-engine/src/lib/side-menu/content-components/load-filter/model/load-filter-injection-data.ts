import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';
import {Filter} from '../../../../filter/models/filter';

export interface LoadFilterInjectionData extends SideMenuInjectionData {
    /**
     * A case filter of the filter cases
     */
    filter: Filter;
}
