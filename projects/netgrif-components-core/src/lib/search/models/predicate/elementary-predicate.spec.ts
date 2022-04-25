import {ElementaryPredicate} from './elementary-predicate';
import {Query} from '../query/query';
import {TestBed} from '@angular/core/testing';

describe('ElementaryPredicate', () => {
    it('should create an instance', () => {
        expect(new ElementaryPredicate(Query.emptyQuery())).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
