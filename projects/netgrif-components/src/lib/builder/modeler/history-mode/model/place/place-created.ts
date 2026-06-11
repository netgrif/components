import {PetriNet, Place} from '@netgrif/petriflow';
import {PlaceChange} from './place-change';

export class PlaceCreated extends PlaceChange {

    constructor(place: Place, model: PetriNet) {
        super(undefined, place, model, `New place ${place.id} has been created`);
    }
}
