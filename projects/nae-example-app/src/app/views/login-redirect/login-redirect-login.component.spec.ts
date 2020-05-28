import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRedirectLoginComponent } from './login-redirect-login.component';
import {AuthenticationMethodService, LoginFormModule, ConfigurationService} from '@netgrif/application-engine';
import {NaeExampleAppConfigurationService} from '../../nae-example-app-configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LoginRedirectLoginComponent', () => {
    let component: LoginRedirectLoginComponent;
    let fixture: ComponentFixture<LoginRedirectLoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LoginFormModule,
                HttpClientTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService},
            ],
            declarations: [LoginRedirectLoginComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginRedirectLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
