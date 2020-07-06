import { TestBed } from '@angular/core/testing';

import StringUtil from './string-util';

describe('StringUtil', () => {
  let service: StringUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
