import {ClausePredicate} from './clause-predicate';
import {BooleanOperator} from '../boolean-operator';

describe('ClausePredicate', () => {
    it('should create an instance', () => {
        expect(new ClausePredicate([], BooleanOperator.AND)).toBeTruthy();
    });
});
