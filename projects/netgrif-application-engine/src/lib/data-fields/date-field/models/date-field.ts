import {DataField, MaterialAppearance} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export class DateField extends DataField<Date> {

    constructor(stringId: string, title: string, value: Date, behavior: Behavior, placeholder?: string,
                description?: string, public validations?: any, public materialAppearance = MaterialAppearance.STANDARD) {
        super(stringId, title, value, behavior, placeholder, description);
    }

    protected valueEquality(a: Date, b: Date): boolean {
        return (a === undefined && b === undefined) || (a !== undefined && b !== undefined && a.getTime() === b.getTime());
    }
}
