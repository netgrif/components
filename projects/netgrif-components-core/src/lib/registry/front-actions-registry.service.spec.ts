import { TestBed } from '@angular/core/testing';

import { FrontActionRegistryService } from './front-action-registry.service';

describe('FrontActionsRegistryService', () => {
  let service: FrontActionRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontActionRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
