import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileComponent} from './profile.component';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {authenticationServiceFactory} from '../../authentication/authentication.factory';
import {TranslateLibModule} from '../../translate/translate-lib.module';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            declarations: [ProfileComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {
                    provide: AuthenticationMethodService,
                    useFactory: authenticationServiceFactory,
                    deps: [ConfigurationService, HttpClientTestingModule]
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
