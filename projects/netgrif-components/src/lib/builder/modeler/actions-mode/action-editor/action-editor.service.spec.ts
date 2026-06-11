import {TestBed} from '@angular/core/testing';
import {ActionEditorService} from './action-editor.service';

describe('ActionEditorService', () => {
  let service: ActionEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
