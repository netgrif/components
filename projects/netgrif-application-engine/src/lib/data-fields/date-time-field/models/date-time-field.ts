import {Layout} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Moment} from 'moment';
import {AbstractTimeInstanceField} from '../../time-instance-abstract-field/models/abstract-time-instance-field';

export class DateTimeField extends AbstractTimeInstanceField {

    constructor(stringId: string, title: string, value: Moment, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: any) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations);
    }

    protected valueEquality(a: Moment, b: Moment): boolean {
        // TODO BUG 9.4. 2020 - Cannot read property 'isEqual' of undefined
        return this.isEqual(a, b, 'minute');
    }
}
