import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigationDrawerComponent} from './navigation-drawer.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelComponentModule} from '../quick-panel/quick-panel.module';
import {NavigationTreeComponent} from '../navigation-tree/navigation-tree.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
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

describe('NavigationDrawerComponent', () => {
    let component: NavigationDrawerComponent;
    let fixture: ComponentFixture<NavigationDrawerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationDrawerComponent, NavigationTreeComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                QuickPanelComponentModule,
                UserComponentModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                ResizableModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: UserPreferenceService, useClass: MockUserPreferenceService}
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
