import {DataField} from "../abstract-data-field";

export class NumberField extends DataField<number>{

    constructor(title: string, placeholder: string, value: number) {
        super(title, placeholder, value);
    }
}
