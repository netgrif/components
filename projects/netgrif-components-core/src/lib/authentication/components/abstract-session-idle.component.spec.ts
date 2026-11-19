import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {OverlayModule} from "@angular/cdk/overlay";
import {RouterTestingModule} from "@angular/router/testing";
import {ConfigurationService} from "../../configuration/configuration.service";
import {TestConfigurationService} from "../../utility/tests/test-config";
import {AuthenticationMethodService} from "../services/authentication-method.service";
import {MockAuthenticationMethodService} from "../../utility/tests/mocks/mock-authentication-method-service";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {MockAuthenticationService} from "../../utility/tests/mocks/mock-authentication.service";
import {AbstractSessionIdleComponent} from "./abstract-session-idle.component";
import {Component, ChangeDetectionStrategy} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../../user/services/user.service";
import {SessionIdleTimerService} from "../session/services/session-idle-timer.service";
import {LoggerService} from "../../logger/services/logger.service";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractSessionIdleComponent', () => {
    let component: AbstractSessionIdleComponent;
    let fixture: ComponentFixture<TestAbstractSessionIdleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestAbstractSessionIdleComponent],
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
        fixture = TestBed.createComponent(TestAbstractSessionIdleComponent);
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
    selector: 'ncc-test',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
class TestAbstractSessionIdleComponent extends AbstractSessionIdleComponent {
    constructor(protected sessionTimer: SessionIdleTimerService,
                protected _user: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _router: Router) {
        super(sessionTimer, _user, _log, _config, _router);
    }

    alert(): void {
    }

    close(): void {
    }


}
