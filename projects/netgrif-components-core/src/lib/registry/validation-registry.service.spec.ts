import { TestBed } from '@angular/core/testing';

import { ValidationRegistryService } from './validation-registry.service';

describe('ValidationRegistryService', () => {
  let service: ValidationRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
