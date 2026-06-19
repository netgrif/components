import {PetriNet, Role} from '@netgrif/petriflow';

export class ChangedRole {

    public readonly id: string;
    public readonly role: Role;
    public readonly model: PetriNet;

    constructor(role?: Role, id: string = role.id, model?: PetriNet) {
        this.id = id;
        this.role = role;
        this.model = model;
    }
}
