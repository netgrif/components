import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';
import {Observable} from 'rxjs';
import {PetriNetReference} from '../../../../resources/interface/petri-net-reference';

export interface NewCaseInjectionData extends SideMenuInjectionData {
    allowedNets$: Observable<Array<PetriNetReference>>;
}
