import {TestBed} from '@angular/core/testing';
import {CategoryResolverService} from './category-resolver.service';
import {Categories} from '../models/category/categories';

describe('CategoryResolverService', () => {
    let service: CategoryResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CategoryResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should resolve all engine categories', () => {
        const categories = Object.values(Categories);
        expect(categories.length > 0).toBeTrue();
        for (const cat of categories) {
            const category = service.toClass(cat);
            expect(category).toBeTruthy();
        }
    });

    it('should not resolve random string', () => {
        expect(service.toClass('random')).toEqual(undefined);
    });
});
