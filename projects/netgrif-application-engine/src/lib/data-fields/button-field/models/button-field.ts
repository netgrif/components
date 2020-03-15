import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export class ButtonField extends DataField<string> {

    constructor(stringId: string, title: string, behavior: Behavior, value?: string,
                placeholder?: string, description?: string) {
        super(stringId, title, behavior, placeholder, description, value);
    }
}
