import { TestBed } from '@angular/core/testing';

import { WorkflowsPanelGroupService } from './workflows-panel-group.service';

describe('WorkflowsPanelGroupService', () => {
  let service: WorkflowsPanelGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowsPanelGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
