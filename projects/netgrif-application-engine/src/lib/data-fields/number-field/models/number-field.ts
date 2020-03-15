import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export class NumberField extends DataField<number> {

    constructor(stringId: string, title: string, value: number, behavior: Behavior, validations?: any,
                placeholder?: string, description?: string, public materialAppearance = 'standard') {
        super(stringId, title,  behavior, placeholder, description, value);
    }
}
