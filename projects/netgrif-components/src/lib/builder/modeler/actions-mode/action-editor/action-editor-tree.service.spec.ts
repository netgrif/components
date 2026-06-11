import {TestBed} from '@angular/core/testing';
import {ActionEditorTreeService} from './action-editor-tree.service';

describe('ActionEditorTreeService', () => {
  let service: ActionEditorTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionEditorTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
