import {DataField} from "../../models/abstract-data-field";
import {Behaviour} from '../../models/behaviour';

export class ButtonField extends DataField<string>{

    constructor(title: string, placeholder: string, behaviour: Behaviour, value?: string) {
        super(title, placeholder, value, behaviour);
    }
}
