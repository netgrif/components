import { TestBed } from '@angular/core/testing';

import { WorkflowsHeaderService } from './workflows-header.service';

describe('WorkflowsHeaderService', () => {
  let service: WorkflowsHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowsHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
