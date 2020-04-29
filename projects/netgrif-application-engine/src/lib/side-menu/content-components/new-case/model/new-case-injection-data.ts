import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';
import {Observable} from 'rxjs';
import {Net} from '../../../../process/net';

export interface NewCaseInjectionData extends SideMenuInjectionData {
    allowedNets$: Observable<Array<Net>>;
}
