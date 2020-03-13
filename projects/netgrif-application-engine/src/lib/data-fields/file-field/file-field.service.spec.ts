import { TestBed } from '@angular/core/testing';

import { FileFieldService } from './file-field.service';

describe('FileFieldService', () => {
  let service: FileFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
