import { TestBed } from '@angular/core/testing';

import { WorkflowPanelGroupService } from './workflow-panel-group.service';

describe('WorkflowPanelGroupService', () => {
  let service: WorkflowPanelGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowPanelGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
