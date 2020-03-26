import { TestBed } from '@angular/core/testing';

import { AbstractTaskService } from './abstract-task.service';

describe('AbstractTaskService', () => {
  let service: AbstractTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
