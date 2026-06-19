import {Arc, ArcType, NodeElement, PetriNet} from '@netgrif/petriflow';

export class ChangedArc {

    public readonly id: string;
    public readonly arc: Arc<NodeElement, NodeElement>;
    public arcType: ArcType;
    public readonly model: PetriNet;

    constructor(model: PetriNet, arc?: Arc<NodeElement, NodeElement>, id = arc?.id) {
        this.id = id;
        this.arc = arc;
        this.arcType = arc?.type;
        this.model = model;
    }
}
