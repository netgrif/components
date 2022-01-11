import {EditableClausePredicate} from './editable-clause-predicate';
import {BooleanOperator} from '../boolean-operator';

describe('EditableClausePredicate', () => {
    it('should create an instance', () => {
        expect(new EditableClausePredicate(BooleanOperator.OR)).toBeTruthy();
    });
});
