import { TestBed } from '@angular/core/testing';

import { PublicTaskLoadingService } from './public-task-loading.service';

describe('PublicTaskLoadingService', () => {
  let service: PublicTaskLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicTaskLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
