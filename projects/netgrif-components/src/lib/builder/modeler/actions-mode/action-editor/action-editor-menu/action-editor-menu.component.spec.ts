import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ArcFactory} from '../../../edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../../services/model/model.service';
import {ActionItemProviderService} from '../action-item-provider.service';
import {ActionEditorMenuComponent} from './action-editor-menu.component';

describe('ActionEditorMenuComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ActionEditorMenuComponent],
            providers: [ActionItemProviderService, ModelService, ArcFactory],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(ActionEditorMenuComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
