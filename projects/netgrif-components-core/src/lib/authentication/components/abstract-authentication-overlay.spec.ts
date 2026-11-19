import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {OverlayModule} from '@angular/cdk/overlay';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractAuthenticationOverlayComponent} from './abstract-authentication-overlay';
import {SessionService} from '../session/services/session.service';
import {SpinnerOverlayService} from '../../utility/service/spinner-overlay.service';
import {Router} from '@angular/router';
import {RedirectService} from '../../routing/redirect-service/redirect.service';
import {AuthenticationMethodService} from '../services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserService} from '../../user/services/user.service';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractAuthenticationOverlay', () => {
    let component: TestAuthenticationOverlayComponent;
    let fixture: ComponentFixture<TestAuthenticationOverlayComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestAuthenticationOverlayComponent],
            imports: [
                OverlayModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestAuthenticationOverlayComponent);
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
    selector: 'ncc-test-overlay',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
class TestAuthenticationOverlayComponent extends AbstractAuthenticationOverlayComponent {
    constructor(protected _session: SessionService, protected _spinnerOverlay: SpinnerOverlayService,
                protected router: Router, protected redirectService: RedirectService, protected userService: UserService) {
        super(_session, _spinnerOverlay, router, redirectService, userService);
    }
}
