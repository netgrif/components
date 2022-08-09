import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';
import {ProcessRole} from '../../../../resources/interface/process-role';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';

/**
 * Interface that represents the input data to the side menu for the user assign component.
 */
export interface UserListInjectedData extends SideMenuInjectionData {
    roles: Array<string> | Array<ProcessRole>;
    value: UserValue | Array<UserValue>;
    negativeRoles?: Array<string> | Array<ProcessRole>;
}
