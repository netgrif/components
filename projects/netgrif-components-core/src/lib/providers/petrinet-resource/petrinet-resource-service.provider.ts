import { PetriNetResourceService } from '../../resources/engine-endpoint/petri-net-resource.service';

export const PetriNetResourceServiceProvider = {
    provide: PetriNetResourceService,
    useClass: PetriNetResourceService
}
