import {ClausePredicate} from './clause-predicate';
import {BooleanOperator} from '../boolean-operator';

export class EditableClausePredicate extends ClausePredicate {

    constructor(operator: BooleanOperator) {
        super([], operator);
    }
}
