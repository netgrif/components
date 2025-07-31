import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
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
    MockAuthenticationService, MockProcessService,
    MockUserResourceService,
    OverflowService, ProcessService,
    SuccessSnackBarComponent,
    TestConfigurationService, TestNoAllowedNetsFactory,
    TestViewService,
    TranslateLibModule,
    UserResourceService,
    ViewService
} from '@netgrif/components-core';
import {provideRouter} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HeaderComponentModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
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
                {provide: ProcessService, useClass: MockProcessService},
                OverflowService
            ],
            declarations: [
                ErrorSnackBarComponent,
                SuccessSnackBarComponent
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

