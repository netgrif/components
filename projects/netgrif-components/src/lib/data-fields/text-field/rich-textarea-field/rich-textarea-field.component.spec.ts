import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RichTextareaFieldComponent} from './rich-textarea-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    MaterialModule,
    TranslateLibModule,
    AuthenticationMethodService,
    AuthenticationService,
    UserResourceService,
    ConfigurationService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TextField,
    CovalentModule,
    WrappedBoolean
} from '@netgrif/application-engine';

describe('RichTextareaFieldComponent', () => {
    let component: RichTextareaFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                CovalentModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [RichTextareaFieldComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get error message', () => {
        expect(component.getErrorMessage()).toEqual('This is custom message!');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: `
        <nc-rich-textarea-field [showLargeLayout]="label"
                                 [formControlRef]="formControl"
                                 [textAreaField]="dataField"></nc-rich-textarea-field>`
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    dataField = new TextField('', '', 'text', {
        editable: true
    }, undefined, undefined, undefined, [{validationRule: 'regex 5', validationMessage: 'This is custom message!'}]);
    formControl = new FormControl();

    constructor() {
        this.formControl.enable();
        this.dataField.registerFormControl(this.formControl);
    }
}
