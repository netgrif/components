import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigationTreeComponent} from './navigation-tree.component';
import {CommonModule} from '@angular/common';
import {
    ConfigurationService,
    MaterialModule,
    TestConfigurationService,
    TranslateLibModule,
    AuthenticationMethodService,
    MockAuthenticationMethodService,
    AuthenticationModule
} from '@netgrif/components-core';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {QuickPanelComponentModule} from '../quick-panel/quick-panel.module';
import {UserComponentModule} from '../../user/user.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('NavigationTreeComponent', () => {
    let component: NavigationTreeComponent;
    let fixture: ComponentFixture<NavigationTreeComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationTreeComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            ],
            imports: [
                CommonModule,
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                QuickPanelComponentModule,
                UserComponentModule,
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
                TranslateLibModule,
                NoopAnimationsModule,
                AuthenticationModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationTreeComponent);
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
