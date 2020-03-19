import {DataField, MaterialAppearance} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export class NumberField extends DataField<number> {

    constructor(stringId: string, title: string, value: number, behavior: Behavior, validations?: any,
                placeholder?: string, description?: string, public materialAppearance = MaterialAppearance.STANDARD) {
        super(stringId, title, value, behavior, placeholder, description);
    }
}
