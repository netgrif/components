import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';
import {Role} from '../../../../user/models/role';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';

/**
 * Interface that represents the input data to the side menu for the user assign component.
 */
export interface UserListInjectedData extends SideMenuInjectionData {
    roles: Array<Role>;
    value: UserValue;
}
