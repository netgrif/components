import {PetriNetReference} from '../resources/interface/petri-net-reference';
import {Permissions} from './permissions';
import NetRole from './netRole';

export interface PetriNetReferenceWithPermissions extends PetriNetReference {
    roles: Array<NetRole>;
    permissions: Permissions;
}

