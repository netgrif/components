import { TestBed } from '@angular/core/testing';

import { AbstractResourceService } from './abstract-resource.service';

describe('AbstractResourceService', () => {
  let service: AbstractResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
