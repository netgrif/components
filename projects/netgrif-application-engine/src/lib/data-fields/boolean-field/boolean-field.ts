import {DataField} from "../abstract-data-field";

export class BooleanField extends DataField<boolean>{

    constructor(stringId: string, title: string, value: boolean, behavior: any,
                placeholder?: string, description?: string,) {
        super(stringId, title, behavior, placeholder, description, value);
    }
}
