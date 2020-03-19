import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export class BooleanField extends DataField<boolean> {

    constructor(stringId: string, title: string, value: boolean, behavior: Behavior,
                placeholder?: string, description?: string) {
        super(stringId, title, behavior, placeholder, description, value);
    }
}
