import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogConfirmComponent} from './dialog-confirm.component';

describe('DialogConfirmComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogConfirmComponent],
            providers: [
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(DialogConfirmComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
