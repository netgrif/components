import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {LoggerService} from '../../logger/services/logger.service';
import {RouterTestingModule} from '@angular/router/testing';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {MockUserPreferenceService} from '../../utility/tests/mocks/mock-user-preference.service';
import {ResizableModule} from 'angular-resizable-element';
import {TestLoggingConfigurationService} from '../../utility/tests/test-logging-config';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import { AbstractNavigationDoubleDrawerComponent } from './abstract-navigation-double-drawer';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/services/user.service';
import { AccessService } from '../../authorization/permission/access.service';
import { UriService } from '../service/uri.service';
import { LanguageService } from '../../translate/language.service';
import {
    DynamicNavigationRouteProviderService
} from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';
import { AuthenticationModule } from '../../authentication/authentication.module';

describe('AbstractNavigationDoubleDrawerComponent', () => {
    let component: TestDrawerComponent;
    let fixture: ComponentFixture<TestDrawerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestDrawerComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                ResizableModule,
                AuthenticationModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestLoggingConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: UserPreferenceService, useClass: MockUserPreferenceService}
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDrawerComponent);
        component = fixture.componentInstance;
        spyOn(component, 'toggleLeftMenu');
        spyOn(component, 'toggleRightMenu');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle menu', (done) => {
        component.toggleMenu();
        expect(component.toggleLeftMenu).toHaveBeenCalled();
        expect(component.toggleRightMenu).toHaveBeenCalled();
        done();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-nav-drawer',
    template: ''
})
class TestDrawerComponent extends AbstractNavigationDoubleDrawerComponent {
    constructor(_router: Router,
                _activatedRoute: ActivatedRoute,
                _breakpoint: BreakpointObserver,
                _languageService: LanguageService,
                _userService: UserService,
                _accessService: AccessService,
                _log: LoggerService,
                _config: ConfigurationService,
                _uriService: UriService,
                _dynamicRouteProviderService: DynamicNavigationRouteProviderService) {
        super(_router, _activatedRoute, _breakpoint, _languageService, _userService, _accessService, _log, _config, _uriService,
            _dynamicRouteProviderService)
    }
}


