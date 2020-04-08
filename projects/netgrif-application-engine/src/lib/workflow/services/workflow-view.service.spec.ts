import { TestBed } from '@angular/core/testing';

import { WorkflowViewService } from './workflow-view.service';

describe('WorkflowsViewService', () => {
  let service: WorkflowViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowViewService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
