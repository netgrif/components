import {TestBed} from '@angular/core/testing';
import {CategoryFactory} from './category-factory';

describe('CategoryFactoryService', () => {
    let service: CategoryFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CategoryFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
