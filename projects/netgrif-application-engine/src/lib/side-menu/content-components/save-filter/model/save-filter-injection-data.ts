import {Filter} from '../../../../filter/models/filter';
import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';

export interface SaveFilterInjectionData extends SideMenuInjectionData {
    filter: Filter;
}
