import {DataField} from "../models/abstract-data-field";
import {Behaviour} from '../models/behaviour';

export class DateField extends DataField<Date> {

    constructor(title: string, placeholder: string, value: Date, behaviour: Behaviour) {
        super(title, placeholder, value, behaviour);
    }
}
