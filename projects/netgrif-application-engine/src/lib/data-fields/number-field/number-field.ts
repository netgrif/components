import {DataField} from '../abstract-data-field';

export class NumberField extends DataField<number> {

    constructor(stringId: string, title: string, value: number, behavior: any, validations?: any,
                placeholder?: string, description?: string, public materialAppearance = 'standard') {
        super(stringId, title,  behavior, placeholder, description, value);
    }
}
