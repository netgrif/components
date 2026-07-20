import {PetriNet, Transition} from '@netgrif/petriflow';

export class ChangedTransition {

    public readonly id: string;
    public readonly transition: Transition;
    public readonly model: PetriNet;

    constructor(model?: PetriNet, transition?: Transition, id = transition?.id) {
        this.id = id;
        this.transition = transition;
        this.model = model;
    }
}
