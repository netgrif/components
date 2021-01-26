import { TestBed } from '@angular/core/testing';

import { PublicTaskResourceService } from './public-task-resource.service';

describe('PublicTaskResourceService', () => {
  let service: PublicTaskResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicTaskResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
