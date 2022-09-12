import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationDoubleDrawerComponent} from './navigation-double-drawer.component';
import {NavigationDrawerComponent} from '../navigation-drawer/navigation-drawer.component';
import {NavigationTreeComponent} from '../navigation-tree/navigation-tree.component';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    AuthenticationModule,
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
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelComponentModule} from '../quick-panel/quick-panel.module';
import {UserComponentModule} from '../../user/user.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ResizableModule} from 'angular-resizable-element';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('NavigationDoubleDrawerComponent', () => {
    let component: NavigationDoubleDrawerComponent;
    let fixture: ComponentFixture<NavigationDoubleDrawerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
                ResizableModule,
                AuthenticationModule
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
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationDoubleDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
