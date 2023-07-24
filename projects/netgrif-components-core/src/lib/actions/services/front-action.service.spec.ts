import { TestBed } from '@angular/core/testing';

import { FrontActionService } from './front-action.service';

describe('FrontActionService', () => {
  let service: FrontActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [FrontActionService]
    });
    service = TestBed.inject(FrontActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
