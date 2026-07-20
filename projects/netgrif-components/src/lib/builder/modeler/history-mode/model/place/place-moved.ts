import {PetriNet, Place} from '@netgrif/petriflow';
import {PlaceChange} from './place-change';

export class PlaceMoved extends PlaceChange {

    constructor(place: Place, model: PetriNet,) {
        super(place, place, model, `Place ${place.id} has been moved to [${place.x}, ${place.y}]`);
    }
}
