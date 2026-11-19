import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../../../material/material.module';
import {PromptDialogComponent} from './prompt-dialog.component';
import {DialogModule} from '../../dialog.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('QuestionDialogWithAnswerComponent', () => {
    let component: PromptDialogComponent;
    let fixture: ComponentFixture<PromptDialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MaterialModule, DialogModule, TranslateLibModule],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PromptDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
