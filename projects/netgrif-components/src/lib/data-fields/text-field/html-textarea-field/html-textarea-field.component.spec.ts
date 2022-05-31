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
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormControl} from '@angular/forms';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('HtmlTextareaFieldComponent', () => {
    let component: HtmlTextareaFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                CovalentModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                QuillModule.forRoot()
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [HtmlTextareaFieldComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        <nc-html-textarea-field [showLargeLayout]="label"
                                [formControlRef]="formControl"
                                [textAreaField]="dataField"></nc-html-textarea-field>`
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

