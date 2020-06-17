import { TestBed } from '@angular/core/testing';

import { TreeTaskContentService } from './tree-task-content.service';

describe('TreeTaskContentService', () => {
  let service: TreeTaskContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeTaskContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
