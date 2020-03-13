import {DataField} from '../abstract-data-field';

export class DateField extends DataField<Date> {

    constructor(stringId: string, title: string, value: Date, behavior: any, placeholder?: string,
                description?: string, public validations?: any, public materialAppearance = 'standard') {
        super(stringId, title, behavior, placeholder, description, value);
    }
}
