import {BreakpointObserver} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
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
import {PathService} from '../service/path.service';
import {AbstractNavigationDoubleDrawerComponent} from './abstract-navigation-double-drawer';
import {TranslateService} from "@ngx-translate/core";
import {CaseResourceService} from "../../resources/engine-endpoint/case-resource.service";
import {MockCaseResourceService} from "../../utility/tests/mocks/mock-case-resource.service";
import {MenuOrder} from "../model/navigation-configs";
import {MockUserService} from "../../utility/tests/mocks/mock-user.service";
import {DoubleDrawerNavigationService} from "./service/double-drawer-navigation.service";
import {RedirectService} from "../../routing/redirect-service/redirect.service";

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
                {provide: UserService, useClass: MockUserService},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
        fixture = TestBed.createComponent(TestDrawerComponent);
        component = fixture.componentInstance;
        spyOn(component, 'toggleLeftMenu').and.callThrough();
        spyOn(component, 'toggleRightMenu').and.callThrough();
        fixture.detectChanges();
    }));

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check current node of navigation', (done) => {
        expect(component.currentPath).toBeDefined();
        component.currentPath = PathService.SEPARATOR;
        timer(1).subscribe(() => {
            expect(component.currentPath).toEqual(PathService.SEPARATOR);
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
        expect(component.currentPath).toEqual(PathService.SEPARATOR);
    });

    it('should go back in menu', (done) => {
        component.currentPath = MockUriResourceService.TEST1_PATH;
        component.onBackClick();
        expect(component.currentPath).toEqual(PathService.SEPARATOR);
        done();
    });

    it('should check the menu state', () => {
        expect(component.isOnZeroLevel()).toBeTruthy();
        expect(component.isLeftItemsEmpty()).toBeTruthy();
        expect(component.isRightItemsEmpty()).toBeTruthy();
    });

    it('should load more items', () => {
        component.moreItems = [{id: 'a'}, {id: 'b'}, {id: 'c'}] as any;
        component.rightItems = [];
        component.loadMoreItems();
        expect(component.rightItems.length).toBeGreaterThan(0);
    });

    it('should switch order and change sorting', () => {
        component.rightItems = [
            {navigation: {title: 'Z'}, id: '1'} as any,
            {navigation: {title: 'A'}, id: '2'} as any
        ];
        component.leftItems = [
            {navigation: {title: 'B'}, id: '3'} as any,
            {navigation: {title: 'C'}, id: '4'} as any
        ];
        component.itemsOrder = MenuOrder.Ascending;
        component.switchOrder();
        console.log(MenuOrder);
        expect(component.itemsOrder).toBe(MenuOrder.Descending as any);
    });


    it('should return id in itemsTrackBy', () => {
        expect(component.itemsTrackBy(1, {id: 'test'} as any)).toBe('test');
    });

    it('should handle resize event', () => {
        const event = {rectangle: {width: 420}} as any;
        component.onResizeEvent(event);
        expect(component.configRightMenu.width).toBe(420);
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
                _pathService: PathService,
                _caseResourceService: CaseResourceService,
                _impersonationUserSelect: ImpersonationUserSelectService,
                _impersonation: ImpersonationService,
                _dynamicRouteProviderService: DynamicNavigationRouteProviderService,
                _redirectService: RedirectService,
                _navigationService: DoubleDrawerNavigationService) {
        super(_router, _activatedRoute, _breakpoint, _languageService, _translateService, _userService, _accessService,
            _log, _config, _pathService, _caseResourceService, _impersonationUserSelect, _impersonation, _dynamicRouteProviderService);
    }
}
