import {TestBed} from '@angular/core/testing';

import {SelectLanguageService} from './select-language.service';

describe('SelectLanguageService', () => {
  let service: SelectLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
