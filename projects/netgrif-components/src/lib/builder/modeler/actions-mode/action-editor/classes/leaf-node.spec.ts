import {TestBed} from '@angular/core/testing';
import {ArcFactory} from '../../../edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../../services/model/model.service';
import {ActionEditorService} from '../action-editor.service';
import {ActionType} from './editable-action';
import {LeafNode} from './leaf-node';

describe('LeafNode', () => {
    let service: ActionEditorService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [ActionEditorService, ModelService, ArcFactory]});
        service = TestBed.inject(ActionEditorService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create an instance', () => {
        const node = new LeafNode(ActionType.TRANSITION, service);
        expect(node).toBeTruthy();
    });

    it('should have actions array', () => {
        const node = new LeafNode(ActionType.DATA, service);
        expect(node.actions).toBeDefined();
    });
});
