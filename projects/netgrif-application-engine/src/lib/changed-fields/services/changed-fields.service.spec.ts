import { TestBed } from '@angular/core/testing';

import { ChangedFieldsService } from './changed-fields.service';

describe('ChangedFieldsService', () => {
  let service: ChangedFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangedFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
