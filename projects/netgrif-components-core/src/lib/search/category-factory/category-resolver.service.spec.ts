import {TestBed} from '@angular/core/testing';
import {CategoryResolverService} from './category-resolver.service';
import {Categories} from '../models/category/categories';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CategoryResolverService', () => {
    let service: CategoryResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [NoopAnimationsModule, HttpClientTestingModule]});
        service = TestBed.inject(CategoryResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should resolve all engine categories', () => {
        const categories = Object.values(Categories);
        const unique = new Set();
        expect(categories.length > 0).toBeTrue();
        for (const cat of categories) {
            const category = service.toClass(cat);
            expect(category).toBeTruthy();
            unique.add(category);
        }
        expect(unique.size).toEqual(categories.length);
    });

    it('should map both ways', () => {
        const categories = Object.values(Categories);
        expect(categories.length > 0).toBeTrue();
        for (const cat of categories) {
            const category = service.toClass(cat);
            expect(category).toBeTruthy();
            const serialized = service.serialize(category);
            expect(serialized).toBeTruthy();
            expect(serialized).toBe(cat);
        }
    });

    it('should not resolve random string', () => {
        expect(service.toClass('random')).toEqual(undefined);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
