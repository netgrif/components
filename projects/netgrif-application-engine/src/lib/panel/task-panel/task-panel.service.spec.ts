import { TestBed } from '@angular/core/testing';

import { TaskPanelService } from './task-panel.service';

describe('TaskPanelService', () => {
  let service: TaskPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
