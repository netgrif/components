import { TestBed } from '@angular/core/testing';

import { EventQueueService } from './event-queue.service';

describe('EventQueueService', () => {
  let service: EventQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
