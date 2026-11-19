import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigationDrawerComponent} from './navigation-drawer.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {QuickPanelComponentModule} from '../quick-panel/quick-panel.module';
import {NavigationTreeComponent} from '../navigation-tree/navigation-tree.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserPreferenceService,
    MockUserResourceService,
    TestConfigurationService,
    TranslateLibModule,
    UserPreferenceService,
    UserResourceService
} from '@netgrif/components-core';
import {UserComponentModule} from '../../user/user.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ResizableModule} from 'angular-resizable-element';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('NavigationDrawerComponent', () => {
    let component: NavigationDrawerComponent;
    let fixture: ComponentFixture<NavigationDrawerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationDrawerComponent, NavigationTreeComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                QuickPanelComponentModule,
                UserComponentModule,
                TranslateLibModule,
                ResizableModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: UserPreferenceService, useClass: MockUserPreferenceService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationDrawerComponent);
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
