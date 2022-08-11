import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';
import {ProcessRole} from '../../../../resources/interface/process-role';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';
import { UserListValue } from '../../../../data-fields/user-list-field/models/user-list-value';

/**
 * Interface that represents the input data to the side menu for the user assign component.
 */
export interface UserListInjectedData extends SideMenuInjectionData {
    roles: Array<string> | Array<ProcessRole>;
    value: UserValue | UserListValue;
    negativeRoles?: Array<string> | Array<ProcessRole>;
}
