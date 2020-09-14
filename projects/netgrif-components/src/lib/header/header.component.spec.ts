import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponentModule} from './header.module';
import {
    TranslateLibModule,
    AuthenticationMethodService,
    AuthenticationService,
    UserResourceService,
    ConfigurationService,
    CaseViewService,
    ViewService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TestViewService,
    ErrorSnackBarComponent,
    SuccessSnackBarComponent,
    MockAuthenticationMethodService
} from '@netgrif/application-engine';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HeaderComponentModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                MatIconModule,
                RouterModule.forRoot([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: CaseViewService, useValue: {allowedNets$: of([])}},
                {provide: ViewService, useClass: TestViewService},
            ],
            declarations: [
                ErrorSnackBarComponent,
                SuccessSnackBarComponent
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
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

