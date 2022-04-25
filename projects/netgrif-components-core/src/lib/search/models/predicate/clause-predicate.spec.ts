import {ClausePredicate} from './clause-predicate';
import {BooleanOperator} from '../boolean-operator';
import {TestBed} from '@angular/core/testing';

describe('ClausePredicate', () => {
    it('should create an instance', () => {
        expect(new ClausePredicate([], BooleanOperator.AND)).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
