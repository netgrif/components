import {TestBed} from '@angular/core/testing';

import {ResourceProvider} from './resource-provider.service';

describe('ResourceProviderService', () => {
  let service: ResourceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
