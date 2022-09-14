import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicResolverComponent} from './public-resolver.component';
import {NaeExampleAppConfigurationService} from '../../nae-example-app-configuration.service';
import {
    MockAuthenticationMethodService,
    AuthenticationMethodService,
    ConfigurationService,
    UserService,
    MaterialModule,
    TranslateLibModule
} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';

describe('PublicResolverComponent', () => {
    let component: PublicResolverComponent;
    let fixture: ComponentFixture<PublicResolverComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PublicResolverComponent],
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                BrowserAnimationsModule,
                RouterTestingModule.withRoutes([]),
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService},
                UserService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicResolverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
