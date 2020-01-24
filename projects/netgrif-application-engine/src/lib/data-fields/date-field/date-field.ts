import {DataField} from "../abstract-data-field";

export class DateField extends DataField<Date> {

    constructor(title: string, placeholder: string, value: Date) {
        super(title, placeholder, value);
    }
}
