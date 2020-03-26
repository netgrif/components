import { TestBed } from '@angular/core/testing';

import { TaskExampleAppService } from './task-example-app.service';

describe('TaskExampleAppService', () => {
  let service: TaskExampleAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskExampleAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
