import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {ArcFactory} from '../../../edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../../services/model/model.service';
import {ActionEditorService} from '../action-editor.service';
import {ActionEditorComponent} from './action-editor.component';

describe('ActionEditorComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ActionEditorComponent],
            providers: [
                ActionEditorService,
                ModelService,
                ArcFactory,
                {provide: MatDialog, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(ActionEditorComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
