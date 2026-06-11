import {TestBed} from '@angular/core/testing';

import {HistoryModeService} from './history-mode.service';

describe('HistoryModeService', () => {
  let service: HistoryModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
