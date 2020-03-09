import {DataField} from "../abstract-data-field";

export class BooleanField extends DataField<boolean>{

    constructor(title: string, placeholder: string, value: boolean) {
        super(title, placeholder, value);
    }
}
