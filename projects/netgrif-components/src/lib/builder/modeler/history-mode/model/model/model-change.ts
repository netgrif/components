import {PetriNet} from '@netgrif/petriflow';
import {ElementChange} from '../element-change';

export class ModelChange extends ElementChange<PetriNet> {

    constructor(
        originalElement: PetriNet,
        element: PetriNet,
        message: string = `Model ${element.id} has been changed`
    ) {
        super(originalElement, element, element, message);
    }
}
