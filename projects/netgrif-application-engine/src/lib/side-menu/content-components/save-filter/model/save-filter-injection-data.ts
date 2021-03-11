import {Filter} from '../../../../filter/models/filter';
import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';
import {SearchMetadata} from '../../../../resources/interface/create-filter-body';

export interface SaveFilterInjectionData extends SideMenuInjectionData {
    filter: Filter;
    searchMetadata: SearchMetadata;
}
