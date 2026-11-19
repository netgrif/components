import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractToolbarComponent} from './abstract-toolbar.component';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../translate/language.service';
import {MockAuthenticationMethodService} from '../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../authentication/services/authentication-method.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {AuthenticationService} from '../authentication/services/authentication/authentication.service';
import {MockUserResourceService} from '../utility/tests/mocks/mock-user-resource.service';
import {MockAuthenticationService} from '../utility/tests/mocks/mock-authentication.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {UserResourceService} from '../resources/engine-endpoint/user-resource.service';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {MaterialModule} from '../material/material.module';
import {UserService} from '../user/services/user.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {RedirectService} from '../routing/redirect-service/redirect.service';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractToolbarComponent', () => {
    let component: TestToolbarComponent;
    let fixture: ComponentFixture<TestToolbarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestToolbarComponent],
            imports: [
                MaterialModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-toolbar',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestToolbarComponent extends AbstractToolbarComponent {
    constructor(protected translate: TranslateService, protected selectLangService: LanguageService,
                protected userService: UserService, protected router: Router, protected redirectService: RedirectService) {
        super(translate, selectLangService, userService, router, redirectService);
    }
}
