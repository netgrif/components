import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SignaturePadFieldComponent} from './signature-pad-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormControl} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TextField,
    TranslateLibModule,
    UserResourceService,
    WrappedBoolean
} from '@netgrif/components-core';

describe('SignaturePadFieldComponent', () => {
    let component: SignaturePadFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
            ],
            declarations: [SignaturePadFieldComponent, TestWrapperComponent],
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
    template: '<nc-signature-pad-field [showLargeLayout]="label" [dataField]="field" [formControlRef]="formControl"> </nc-signature-pad-field>'
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new TextField('', '', 'text', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, []);
    formControl = new FormControl();

    constructor() {
        this.field.registerFormControl(this.formControl);
    }
}