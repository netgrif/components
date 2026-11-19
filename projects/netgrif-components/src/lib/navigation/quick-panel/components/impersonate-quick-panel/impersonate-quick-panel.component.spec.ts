import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpersonateQuickPanelComponent} from './impersonate-quick-panel.component';
import {
    AuthenticationMethodService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    SnackBarService, TestConfigurationService,
    TranslateLibModule
} from '@netgrif/components-core';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('ImpersonateQuickPanelComponent', () => {
    let component: ImpersonateQuickPanelComponent;
    let fixture: ComponentFixture<ImpersonateQuickPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImpersonateQuickPanelComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                SnackBarService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImpersonateQuickPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
