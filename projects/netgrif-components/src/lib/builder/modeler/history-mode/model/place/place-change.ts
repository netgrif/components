import {PetriNet, Place} from '@netgrif/petriflow';
import {ElementChange} from '../element-change';

export class PlaceChange extends ElementChange<Place> {

    constructor(originalPlace: Place, place: Place, model: PetriNet, message = `Place ${place.id} has been changed`) {
        super(originalPlace, place, model, message);
    }

    get originalPlace(): Place {
        return this.originalElement;
    }

    get place(): Place {
        return this.element;
    }
}
