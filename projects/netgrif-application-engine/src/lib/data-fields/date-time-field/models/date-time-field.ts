import {DataField, MaterialAppearance} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export class DateTimeField extends DataField<Date> {

    constructor(stringId: string, title: string, value: Date, behavior: Behavior, placeholder?: string,
                description?: string, public validations?: any, public materialAppearance = MaterialAppearance.STANDARD) {
        super(stringId, title, behavior, placeholder, description, value);
    }
}
