import {AuthenticationOverlayComponent} from './authentication-overlay.component';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OverlayModule} from '@angular/cdk/overlay';
import {RouterTestingModule} from '@angular/router/testing';
import {
    AuthenticationMethodService,
    ConfigurationService,
    MockAuthenticationMethodService,
    TestConfigurationService
} from '@netgrif/components-core';

describe('AuthenticationOverlayComponent', () => {
    let component: AuthenticationOverlayComponent;
    let fixture: ComponentFixture<AuthenticationOverlayComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationOverlayComponent],
            imports: [HttpClientTestingModule, OverlayModule, RouterTestingModule.withRoutes([])],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthenticationOverlayComponent);
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
