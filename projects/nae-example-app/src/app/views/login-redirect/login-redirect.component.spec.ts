import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRedirectComponent } from './login-redirect.component';
import {AuthenticationMethodService, LoginFormModule, ConfigurationService} from '@netgrif/application-engine';
import {NaeExampleAppConfigurationService} from '../../nae-example-app-configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LoginRedirectComponent', () => {
    let component: LoginRedirectComponent;
    let fixture: ComponentFixture<LoginRedirectComponent>;

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
            declarations: [LoginRedirectComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginRedirectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
