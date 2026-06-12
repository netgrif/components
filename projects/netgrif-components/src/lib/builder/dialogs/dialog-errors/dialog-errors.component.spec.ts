import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogErrorsComponent} from './dialog-errors.component';

describe('DialogErrorsComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogErrorsComponent],
            providers: [{provide: MAT_DIALOG_DATA, useValue: {errors: []}}],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(DialogErrorsComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
