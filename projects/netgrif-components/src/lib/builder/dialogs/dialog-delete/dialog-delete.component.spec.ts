import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogDeleteComponent} from './dialog-delete.component';

describe('DialogDeleteComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogDeleteComponent],
            providers: [
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(DialogDeleteComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
