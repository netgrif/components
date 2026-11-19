import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginFormComponent} from './login-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    AuthenticationMethodService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    TestConfigurationService,
    TranslateLibModule,
} from '@netgrif/components-core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginFormComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                MaterialModule,
                FlexLayoutModule,
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginFormComponent);
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


