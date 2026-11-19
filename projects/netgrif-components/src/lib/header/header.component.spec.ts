import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {of} from 'rxjs';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponentModule} from './header.module';
import {
    AllowedNetsService, AllowedNetsServiceFactory,
    AuthenticationMethodService,
    AuthenticationService,
    CaseViewService,
    ConfigurationService,
    ErrorSnackBarComponent,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    OverflowService,
    SuccessSnackBarComponent,
    TestConfigurationService, TestNoAllowedNetsFactory,
    TestViewService,
    TranslateLibModule,
    UserResourceService,
    ViewService
} from '@netgrif/components-core';
import {RouterTestingModule} from "@angular/router/testing";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ErrorSnackBarComponent,
                SuccessSnackBarComponent
            ],
            imports: [
                HeaderComponentModule,
                TranslateLibModule,
                MatIconModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: CaseViewService, useValue: {allowedNets$: of([])}},
                {provide: ViewService, useClass: TestViewService},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                OverflowService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
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

