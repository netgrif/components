import {waitForAsync, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormBuilder} from '@angular/forms';
import {Component} from '@angular/core';
import {AbstractEmailSubmissionFormComponent} from './abstract-email-submission-form.component';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {LoadingEmitter} from '../../utility/loading-emitter';

describe('AbstractEmailSubmissionFormComponent ', () => {
    let component: TestPassFormComponent;
    let fixture: ComponentFixture<TestPassFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            declarations: [TestPassFormComponent],
            providers: [FormBuilder]
        }).compileComponents();

        fixture = TestBed.createComponent(TestPassFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit', (done) => {
        component.rootFormGroup.controls['email'].setValue('login@login.sk');
        component.formSubmit.subscribe( event => {
            expect(event).toEqual({ email: 'login@login.sk', loading: new LoadingEmitter() });
            done();
        });
        component.onSubmit();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-password',
    template: ''
})
class TestPassFormComponent extends AbstractEmailSubmissionFormComponent {
    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }
}
