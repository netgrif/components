import {TestBed} from '@angular/core/testing';

import {ActionItemProviderService} from './action-item-provider.service';

describe('ActionItemproviderService', () => {
  let service: ActionItemProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionItemProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
