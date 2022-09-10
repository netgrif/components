import {TransitionImport} from './transition-import';
import {PlaceImport} from './place-import';
import {ArcImport} from './arc-import';

export interface PetriNetImport {
    transitions: Array<TransitionImport>;
    places: Array<PlaceImport>;
    arcs: Array<ArcImport>;
}
