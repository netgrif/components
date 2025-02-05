import {BreakpointObserver} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {ResizableModule} from 'angular-resizable-element';
import {timer} from 'rxjs';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {AccessService} from '../../authorization/permission/access.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {ImpersonationUserSelectService} from '../../impersonation/services/impersonation-user-select.service';
import {ImpersonationService} from '../../impersonation/services/impersonation.service';
import {LoggerService} from '../../logger/services/logger.service';
import {MaterialModule} from '../../material/material.module';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {
    DynamicNavigationRouteProviderService,
} from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';
import {LanguageService} from '../../translate/language.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {UserService} from '../../user/services/user.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {MockUriResourceService} from '../../utility/tests/mocks/mock-uri-resource.service';
import {MockUserPreferenceService} from '../../utility/tests/mocks/mock-user-preference.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {TestLoggingConfigurationService} from '../../utility/tests/test-logging-config';
import {UriResourceService} from '../service/uri-resource.service';
import {UriService} from '../service/uri.service';
import {AbstractNavigationDoubleDrawerComponent} from './abstract-navigation-double-drawer';
import {TranslateService} from "@ngx-translate/core";
import {CaseResourceService} from "../../resources/engine-endpoint/case-resource.service";
import {MockCaseResourceService} from "../../utility/tests/mocks/mock-case-resource.service";
import {DoubleDrawerNavigationService} from "./service/double-drawer-navigation.service";
import {RedirectService} from "../../routing/redirect-service/redirect.service";

xdescribe('AbstractNavigationDoubleDrawerComponent', () => {
    let component: TestDrawerComponent;
    let fixture: ComponentFixture<TestDrawerComponent>;
    let uriService: UriService;

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
                AuthenticationModule,
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestLoggingConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: UserPreferenceService, useClass: MockUserPreferenceService},
                {provide: CaseResourceService, useClass: MockCaseResourceService},
                {provide: UriResourceService, useClass: MockUriResourceService},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
        uriService = TestBed.inject(UriService);
        fixture = TestBed.createComponent(TestDrawerComponent);
        component = fixture.componentInstance;
        spyOn(component, 'toggleLeftMenu');
        spyOn(component, 'toggleRightMenu');
        fixture.detectChanges();
    }));

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check current node of navigation', (done) => {
        expect(component.currentNode).toBeDefined();
        component.currentNode = uriService.root;
        timer(1).subscribe(() => {
            expect(component.currentNode).toEqual(uriService.root);
            expect(component.leftItems).toBeDefined();
            expect(component.leftItems.length).toEqual(0);
            expect(component.rightItems).toBeDefined();
            expect(component.rightItems.length).toEqual(0);
            done();
        });
    });

    it('should toggle menu', (done) => {
        component.toggleMenu();
        expect(component.toggleLeftMenu).toHaveBeenCalled();
        expect(component.toggleRightMenu).toHaveBeenCalled();
        done();
    });

    it('should logout', () => {
        component.logout();
        expect(component.user.id).toEqual('');
    });

    it('should go to home menu', () => {
        component.onHomeClick();
        expect(component.currentNode).toEqual(uriService.root);
    });

    it('should go back in menu', (done) => {
        uriService.getNodeByPath(MockUriResourceService.TEST1_PATH).subscribe(node => {
            component.currentNode = node;
            component.onBackClick();
            expect(component.currentNode).toEqual(uriService.root);
            done();
        });
    });

    it('should check the menu state', () => {
        expect(component.isOnZeroLevel()).toBeTruthy();
        expect(component.isLeftItemsEmpty).toBeTruthy();
        expect(component.isRightItemsEmpty).toBeTruthy();
    });

});

@Component({
    selector: 'ncc-test-nav-drawer',
    template: '',
})
class TestDrawerComponent extends AbstractNavigationDoubleDrawerComponent {
    constructor(_router: Router,
                _activatedRoute: ActivatedRoute,
                _breakpoint: BreakpointObserver,
                _languageService: LanguageService,
                _translateService: TranslateService,
                _userService: UserService,
                _accessService: AccessService,
                _log: LoggerService,
                _config: ConfigurationService,
                _uriService: UriService,
                _caseResourceService: CaseResourceService,
                _impersonationUserSelect: ImpersonationUserSelectService,
                _impersonation: ImpersonationService,
                _dynamicRouteProviderService: DynamicNavigationRouteProviderService,
                _redirectService: RedirectService,
                _navigationService: DoubleDrawerNavigationService) {
        super(_router, _activatedRoute, _breakpoint, _languageService, _translateService, _userService, _accessService,
            _log, _config, _uriService, _caseResourceService, _impersonationUserSelect, _impersonation,
            _dynamicRouteProviderService, _redirectService, _navigationService);
    }
}


