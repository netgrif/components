import { TestBed } from '@angular/core/testing';

import { LanguageIconsService } from './language-icons.service';

describe('LanguageIconsService', () => {
  let service: LanguageIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
