import {DataField} from "../models/abstract-data-field";
import {Behaviour} from '../models/behaviour';

export class NumberField extends DataField<number>{

    constructor(title: string, placeholder: string, value: number, behaviour: Behaviour) {
        super(title, placeholder, value, behaviour);
    }
}
