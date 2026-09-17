import {PetriNet} from '@netgrif/petriflow';
import {ModelChange} from './model-change';

export class ModelImported extends ModelChange {
    // todo 2477
    constructor(model: PetriNet) {
        super(undefined, model, `Model ${model.id} has been imported`);
    }
}
