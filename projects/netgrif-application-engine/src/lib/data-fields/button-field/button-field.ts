import {DataField} from "../abstract-data-field";

export class ButtonField extends DataField<string>{

    constructor(title: string, placeholder: string, value?: string) {
        super(title, placeholder, value);
    }
}
