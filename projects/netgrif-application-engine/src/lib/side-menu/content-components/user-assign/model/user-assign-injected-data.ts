import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';
import Role from '../../../../user/models/role';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';

export interface UserAssignInjectedData extends SideMenuInjectionData {
    roles: Array<Role>;
    value: UserValue;
}
