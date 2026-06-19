import {TestBed} from '@angular/core/testing';
import {ArcFactory} from '../../edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../services/model/model.service';
import {ActionEditorService} from './action-editor.service';

describe('ActionEditorService', () => {
    let service: ActionEditorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ActionEditorService, ModelService, ArcFactory],
        });
        service = TestBed.inject(ActionEditorService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
