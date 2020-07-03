import { TestBed } from '@angular/core/testing';

import { TreeTaskContentService } from './tree-task-content.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TreeCaseViewService} from '../tree-case-view.service';

describe('TreeTaskContentService', () => {
  let service: TreeTaskContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [NoopAnimationsModule],
        providers: [
            TreeTaskContentService,
            NoopAnimationsModule,
            TreeCaseViewService
        ]
    });
    service = TestBed.inject(TreeTaskContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
