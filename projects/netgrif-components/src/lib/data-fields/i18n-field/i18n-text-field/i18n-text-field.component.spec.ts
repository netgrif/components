import {ComponentFixture, TestBed} from '@angular/core/testing';
import {I18nTextFieldComponent} from './i18n-text-field.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    I18nField,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
    WrappedBoolean,
    LanguageService
} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('I18nTextFieldComponent', () => {
    let component: I18nTextFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let service: LanguageService;

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
            declarations: [I18nTextFieldComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        service = TestBed.inject(LanguageService);
        service.setLanguage('en-US');
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    @Component({
        selector: 'nc-test-wrapper',
        template: '<nc-i18n-text-field [formControlRef]="fc" [textI18nField]="field" [showLargeLayout]="boolean"></nc-i18n-text-field>'
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
        fc =  new FormControl('', { updateOn: 'blur' });
        boolean = new WrappedBoolean();

        constructor() {
            this.field.registerFormControl(this.fc);
        }
    }
});
