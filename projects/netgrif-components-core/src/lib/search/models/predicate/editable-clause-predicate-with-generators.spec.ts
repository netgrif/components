import {EditableClausePredicateWithGenerators} from './editable-clause-predicate-with-generators';
import {BooleanOperator} from '../boolean-operator';
import {PredicateWithGenerator} from './predicate-with-generator';
import {TestBed} from '@angular/core/testing';

describe('EditableClausePredicateWithGenerators', () => {
    it('should create an instance', () => {
        expect(new EditableClausePredicateWithGenerators(BooleanOperator.OR)).toBeTruthy();
    });

    it('calling overridden inherited methods works as expected', () => {
        const root = new EditableClausePredicateWithGenerators(BooleanOperator.OR);

        const id = root.addNewElementaryPredicate();
        expect(typeof id).toEqual('number');

        const map = root.getPredicateMap();
        expect(map).toBeTruthy();
        expect(map.get(id)).toBeTruthy();
        expect(map.get(id) instanceof PredicateWithGenerator).toBeTrue();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
