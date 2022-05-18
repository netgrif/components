import {ComponentFixture, TestBed} from '@angular/core/testing';
import {I18nDividerFieldComponent} from './i18n-divider-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
    AuthenticationMethodService, AuthenticationService, ConfigurationService,
    I18nField,
    MaterialModule,
    MockAuthenticationMethodService, MockAuthenticationService, MockUserResourceService, TestConfigurationService,
    TranslateLibModule, UserResourceService,
    WrappedBoolean
} from '@netgrif/components-core';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('I18nDividerFieldComponent', () => {
    let component: I18nDividerFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService}
            ],
            declarations: [I18nDividerFieldComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    @Component({
        selector: 'nc-test-wrapper',
        template: '<nc-i18n-divider-field [formControlRef]="fc" [dividerI18nField]="field" [showLargeLayout]="boolean">' +
            '</nc-i18n-divider-field>'
    })
    class TestWrapperComponent {
        field = new I18nField('', '',
            {defaultValue: 'Default translation', translations: {en: 'English translation'}},
            {
                required: true,
                optional: true,
                visible: true,
                editable: true,
                hidden: true
            }
        );
        fc = new FormControl('', {updateOn: 'blur'});
        boolean = new WrappedBoolean();

        constructor() {
            this.field.registerFormControl(this.fc);
        }
    }
});
