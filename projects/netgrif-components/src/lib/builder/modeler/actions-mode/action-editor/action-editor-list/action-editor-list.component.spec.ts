import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ActionEditorListComponent} from './action-editor-list.component';

describe('ActionEditorListComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ActionEditorListComponent],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(ActionEditorListComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
