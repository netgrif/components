import { TestBed } from '@angular/core/testing';

import { TreeCaseViewService } from './tree-case-view.service';

describe('TreeCaseViewService', () => {
  let service: TreeCaseViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeCaseViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
