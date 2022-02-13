import {TestBed} from '@angular/core/testing';
import {SearchIndexResolverService} from './search-index-resolver.service';
import {SearchIndex} from '../models/search-index';

describe('SearchIndexResolverService', () => {
    let service: SearchIndexResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SearchIndexResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should construct index', () => {
        expect(service.getIndex('field', SearchIndex.TEXT)).toEqual('dataSet.field.textValue');
        expect(service.getIndex('field', SearchIndex.TEXT, true)).toEqual('dataSet.field.textValue.keyword');
    });
});
