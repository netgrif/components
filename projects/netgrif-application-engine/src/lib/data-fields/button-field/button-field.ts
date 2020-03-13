import {DataField} from '../abstract-data-field';

export class ButtonField extends DataField<string> {

    constructor(stringId: string, title: string, behavior: any, value?: string,
                placeholder?: string, description?: string) {
        super(stringId, title, behavior, placeholder, description, value);
    }
}
