import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {HeaderModule} from './header.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CaseViewService} from '../view/case-view/service/case-view-service';
import {of} from 'rxjs';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../authentication/services/authentication-method.service';
import {AuthenticationService} from '../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {RouterModule} from '@angular/router';
import {ViewService} from '../routing/view-service/view.service';
import {TestViewService} from '../utility/tests/test-view-service';
import {ErrorSnackBarComponent} from '../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatIconModule} from '@angular/material/icon';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HeaderModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                MatIconModule,
                RouterModule.forRoot([])
            ],
            providers: [
                AuthenticationMethodService,
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

