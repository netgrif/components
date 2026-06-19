import {PetriNet, Place} from '@netgrif/petriflow';
import {PlaceChange} from './place-change';

export class PlaceDeleted extends PlaceChange {

    constructor(place: Place, model: PetriNet) {
        super(place, undefined, model, `Place ${place.id} has been deleted`);
    }
}
