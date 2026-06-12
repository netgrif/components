import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogLocalStorageModelComponent} from './dialog-local-storage-model.component';

describe('DialogLocalStorageModelComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogLocalStorageModelComponent],
            providers: [
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(DialogLocalStorageModelComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
