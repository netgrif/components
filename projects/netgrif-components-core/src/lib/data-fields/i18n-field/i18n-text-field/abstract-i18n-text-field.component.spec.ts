import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';
import {I18nField} from '../models/i18n-field';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AbstractI18nTextFieldComponent} from './abstract-i18n-text-field.component';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TranslateService} from '@ngx-translate/core';
import {LanguageIconsService} from '../language-icons.service';
import {DomSanitizer} from '@angular/platform-browser';
import {LanguageService} from '../../../translate/language.service';

describe('AbstractI18nTextFieldComponent', () => {
    let component: TestI18nTextComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let service: LanguageService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [TestI18nTextComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        service = TestBed.inject(LanguageService);
        service.setLanguage('en-US');
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
    selector: 'nae-test-i18n-text',
    template: ''
})
class TestI18nTextComponent extends AbstractI18nTextFieldComponent {
    constructor(protected languageIconsService: LanguageIconsService,
                protected _translateService: TranslateService,
                protected _domSanitizer: DomSanitizer) {
        super(languageIconsService, _translateService, _domSanitizer);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: `
        <nae-test-i18n-text [showLargeLayout]="label"
                            [textI18nField]="field"
                            [formControlRef]="formControl">
        </nae-test-i18n-text>`
})
class TestWrapperComponent {
    label = new WrappedBoolean();
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
    formControl = new FormControl();
}
