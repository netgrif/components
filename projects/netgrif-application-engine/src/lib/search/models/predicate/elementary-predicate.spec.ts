import {ElementaryPredicate} from './elementary-predicate';
import {Query} from '../query/query';

describe('ElementaryPredicate', () => {
    it('should create an instance', () => {
        expect(new ElementaryPredicate(Query.emptyQuery())).toBeTruthy();
    });
});
