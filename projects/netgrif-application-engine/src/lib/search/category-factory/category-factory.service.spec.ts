import { TestBed } from '@angular/core/testing';

import { CategoryFactoryService } from './category-factory.service';

describe('CategoryFactoryService', () => {
  let service: CategoryFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
