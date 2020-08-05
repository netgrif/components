import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthenticationOverlayComponent} from './authentication-overlay.component';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OverlayModule} from '@angular/cdk/overlay';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthenticationOverlayComponent', () => {
    let component: AuthenticationOverlayComponent;
    let fixture: ComponentFixture<AuthenticationOverlayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationOverlayComponent],
            imports: [HttpClientTestingModule, OverlayModule, RouterTestingModule.withRoutes([])],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
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
});
