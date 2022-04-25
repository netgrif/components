import {TestBed} from '@angular/core/testing';
import {SearchIndexResolverService} from './search-index-resolver.service';
import {SearchIndex} from '../models/search-index';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SearchIndexResolverService', () => {
    let service: SearchIndexResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [NoopAnimationsModule, HttpClientTestingModule]});
        service = TestBed.inject(SearchIndexResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should construct index', () => {
        expect(service.getIndex('field', SearchIndex.TEXT)).toEqual('dataSet.field.textValue');
        expect(service.getIndex('field', SearchIndex.TEXT, true)).toEqual('dataSet.field.textValue.keyword');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
