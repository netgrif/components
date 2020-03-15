import {DataField} from "../../models/abstract-data-field";
import {Behaviour} from '../../models/behaviour';

export class BooleanField extends DataField<boolean>{

    constructor(title: string, placeholder: string, value: boolean, behaviour: Behaviour) {
        super(title, placeholder, value, behaviour);
    }
}
