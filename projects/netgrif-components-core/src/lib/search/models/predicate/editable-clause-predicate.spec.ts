import {EditableClausePredicate} from './editable-clause-predicate';
import {BooleanOperator} from '../boolean-operator';
import {TestBed} from '@angular/core/testing';

describe('EditableClausePredicate', () => {
    it('should create an instance', () => {
        expect(new EditableClausePredicate(BooleanOperator.OR)).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
