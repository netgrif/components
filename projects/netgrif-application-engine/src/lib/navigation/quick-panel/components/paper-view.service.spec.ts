import { TestBed } from '@angular/core/testing';

import { PaperViewService } from './paper-view.service';

describe('PaperViewService', () => {
  let service: PaperViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaperViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
