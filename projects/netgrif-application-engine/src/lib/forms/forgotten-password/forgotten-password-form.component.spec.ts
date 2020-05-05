import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ForgottenPasswordFormComponent} from './forgotten-password-form.component';
import {FormBuilder} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ForgottenPasswordPanelComponent', () => {
    let component: ForgottenPasswordFormComponent;
    let fixture: ComponentFixture<ForgottenPasswordFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, FlexLayoutModule, BrowserAnimationsModule, TranslateLibModule, HttpClientTestingModule],
            declarations: [ForgottenPasswordFormComponent],
            providers: [FormBuilder]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgottenPasswordFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit', (done) => {
        component.rootFormGroup.controls['email'].setValue('login@login.sk');
        component.formSubmit.subscribe( event => {
            expect(event).toEqual({ email: 'login@login.sk' });
            done();
        });
        component.onSubmit();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
