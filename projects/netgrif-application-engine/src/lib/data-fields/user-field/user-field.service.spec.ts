import { TestBed } from '@angular/core/testing';

import { UserFieldService } from './user-field.service';

describe('UserFieldService', () => {
  let service: UserFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
