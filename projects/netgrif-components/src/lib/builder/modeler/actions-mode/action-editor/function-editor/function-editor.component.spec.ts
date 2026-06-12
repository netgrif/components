import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ModelService} from '../../../services/model/model.service';
import {ActionEditorService} from '../action-editor.service';
import {FunctionEditorComponent} from './function-editor.component';

describe('FunctionEditorComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FunctionEditorComponent],
            imports: [MatMenuModule, MatSidenavModule, NoopAnimationsModule],
            providers: [
                {provide: ActionEditorService, useValue: {nextId: () => '1'}},
                {provide: ModelService, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(FunctionEditorComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
