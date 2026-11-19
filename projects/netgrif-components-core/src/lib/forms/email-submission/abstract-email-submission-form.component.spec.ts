import {waitForAsync, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {FormBuilder} from '@angular/forms';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractEmailSubmissionFormComponent} from './abstract-email-submission-form.component';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractEmailSubmissionFormComponent ', () => {
    let component: TestPassFormComponent;
    let fixture: ComponentFixture<TestPassFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestPassFormComponent],
            imports: [
                MaterialModule,
                FlexLayoutModule,
                TranslateLibModule
            ],
            providers: [FormBuilder,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    selector: 'ncc-test-password',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestPassFormComponent extends AbstractEmailSubmissionFormComponent {
    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }
}
