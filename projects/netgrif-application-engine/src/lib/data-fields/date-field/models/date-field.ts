import {DataField} from "../../models/abstract-data-field";
import {Behavior} from '../../models/behavior';

export class DateField extends DataField<Date> {

    constructor(title: string, placeholder: string, value: Date, behaviour: Behavior) {
        super(title, placeholder, value, behaviour);
    }
}
