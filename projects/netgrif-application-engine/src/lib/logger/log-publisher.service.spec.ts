import { TestBed } from '@angular/core/testing';

import { LogPublisherService } from './log-publisher.service';

describe('LogPublisherService', () => {
  let service: LogPublisherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogPublisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
