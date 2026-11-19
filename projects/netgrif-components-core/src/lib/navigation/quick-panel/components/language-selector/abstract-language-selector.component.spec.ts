import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractLanguageSelectorComponent} from './abstract-language-selector.component';
import {LanguageService} from '../../../../translate/language.service';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {MockAuthenticationMethodService} from '../../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../../../resources/engine-endpoint/user-resource.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {MockUserResourceService} from '../../../../utility/tests/mocks/mock-user-resource.service';
import {MockAuthenticationService} from '../../../../utility/tests/mocks/mock-authentication.service';
import {LanguageIconsService} from "../../../../data-fields/i18n-field/language-icons.service";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractLanguageSelectorComponent', () => {
    let component: TestLangComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestLangComponent, TestWrapperComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
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
    selector: 'ncc-test-lang',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestLangComponent extends AbstractLanguageSelectorComponent {
    constructor(protected _select: LanguageService,
                protected _languageIconsService: LanguageIconsService) {
        super(_select, _languageIconsService);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-lang></ncc-test-lang>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
}
