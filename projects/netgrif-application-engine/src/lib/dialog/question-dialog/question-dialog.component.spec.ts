import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuestionDialogComponent} from './question-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogModule} from '../dialog.module';

describe(' QuestionDialogComponent', () => {
    let component: QuestionDialogComponent;
    let fixture: ComponentFixture<QuestionDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, DialogModule, BrowserAnimationsModule],
            declarations: [],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
