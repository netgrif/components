import {TestBed} from '@angular/core/testing';

import {FieldListService} from './field-list.service';

describe('FieldListService', () => {
  let service: FieldListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
