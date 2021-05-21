import { TestBed } from '@angular/core/testing';

import { DefaultGroupNavigationComponentResolverService } from './default-group-navigation-component-resolver.service';

describe('DefaultGroupNavigationComponentResolverService', () => {
  let service: DefaultGroupNavigationComponentResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultGroupNavigationComponentResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
