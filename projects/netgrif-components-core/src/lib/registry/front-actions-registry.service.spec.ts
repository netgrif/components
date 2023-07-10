import { TestBed } from '@angular/core/testing';

import { FrontActionsRegistryService } from './front-actions-registry.service';

describe('FrontActionsRegistryService', () => {
  let service: FrontActionsRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontActionsRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
