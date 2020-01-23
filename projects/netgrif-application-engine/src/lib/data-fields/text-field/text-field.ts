import {DataField} from "../abstract-data-field";

export class TextField extends DataField<string>{

    constructor(title: string, placeholder: string, value: string, public validations: any, public label: string) {
        super(title, placeholder, value);
    }

}
