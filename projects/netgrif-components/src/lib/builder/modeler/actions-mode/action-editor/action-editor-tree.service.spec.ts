import {TestBed} from '@angular/core/testing';
import {ArcFactory} from '../../edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../services/model/model.service';
import {ActionEditorService} from './action-editor.service';
import {ActionEditorTreeService} from './action-editor-tree.service';
import {TranslateService} from "@ngx-translate/core";

describe('ActionEditorTreeService', () => {
    let service: ActionEditorTreeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ActionEditorTreeService,
                ActionEditorService,
                ModelService,
                ArcFactory,
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
        });
        service = TestBed.inject(ActionEditorTreeService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
