import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {HtmlTextareaFieldComponent} from './html-textarea-field.component';
import {QuillModule} from 'ngx-quill';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    CovalentModule,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TextAreaField,
    TranslateLibModule,
    UserResourceService,
    WrappedBoolean
} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {FormControl} from '@angular/forms';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('HtmlTextareaFieldComponent', () => {
    let component: HtmlTextareaFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                HtmlTextareaFieldComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                CovalentModule,
                TranslateLibModule,
                QuillModule.forRoot()
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: `
        <nc-html-textarea-field
            [showLargeLayout]="label"
            [formControlRef]="formControl"
            [dataField]="dataField"
        ></nc-html-textarea-field>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    dataField = new TextAreaField('', '', 'text', {
        editable: true
    }, undefined, undefined, undefined, []);
    formControl = new FormControl();

    constructor() {
        this.formControl.enable();
        this.dataField.registerFormControl(this.formControl);
    }
}

