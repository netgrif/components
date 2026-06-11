import {TestBed} from '@angular/core/testing';

import {LanguageSelectService} from './language-select.service';

describe('LanguageSelectService', () => {
  let service: LanguageSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
