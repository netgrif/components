import {Operator} from './operator';

/**
 * Strict equality operator. Will match if the field has the exact same value as the input.
 * Can be used with keyword fields and different types,
 * but it is not recommended to use it with date and datetime fields as an exact timestamp match would be required.
 * Use {@link EqualDate} or {@link EqualDateTime} instead.
 */
export class Equals extends Operator {
    constructor() {
        // query string queries don't use a special symbol for strict equality
        super(1, '');
    }
}
