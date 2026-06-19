import {PetriNet} from '@netgrif/petriflow';

export interface ModelSource {

    get model(): PetriNet;
}
