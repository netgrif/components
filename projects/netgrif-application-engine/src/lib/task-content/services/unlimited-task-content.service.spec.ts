import { TestBed } from '@angular/core/testing';

import { UnlimitedTaskContentService } from './unlimited-task-content.service';

describe('UnlimitedTaskContentService', () => {
  let service: UnlimitedTaskContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnlimitedTaskContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
