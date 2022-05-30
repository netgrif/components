import {PredicateWithGenerator} from './predicate-with-generator';
import {ElementaryPredicate} from './elementary-predicate';
import {Query} from '../query/query';
import {TestBed} from '@angular/core/testing';

describe('PredicateWithGenerator', () => {
    it('should create an instance', () => {
        expect(new PredicateWithGenerator(new ElementaryPredicate(Query.emptyQuery()))).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
