import {TestBed} from '@angular/core/testing';
import {ActionsModeService} from './actions-mode.service';

describe('ActionsModeService', () => {
  let service: ActionsModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionsModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
