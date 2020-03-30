import { TestBed } from '@angular/core/testing';

import { WorkflowsViewService } from './workflows-view.service';

describe('WorkflowsViewService', () => {
  let service: WorkflowsViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowsViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
