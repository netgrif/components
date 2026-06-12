import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ModelService} from '../../services/model/model.service';
import {TaskRefInitFieldComponent} from './task-ref-init-field.component';

describe('TaskRefInitFieldComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TaskRefInitFieldComponent],
            imports: [ReactiveFormsModule, MatAutocompleteModule, MatChipsModule, NoopAnimationsModule],
            providers: [{provide: ModelService, useValue: {model: {}}}],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(TaskRefInitFieldComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
