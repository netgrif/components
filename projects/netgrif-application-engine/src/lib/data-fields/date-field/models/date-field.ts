import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export class DateField extends DataField<Date> {

    constructor(stringId: string, title: string, value: Date, behavior: Behavior, placeholder?: string,
                description?: string, public validations?: any, public materialAppearance = 'standard') {
        super(stringId, title, behavior, placeholder, description, value);
    }
}
