import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {ActorService} from "./actor.service";

describe('ActorService', () => {
    let service: ActorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                // todo 2058 mock actorService dependencies
                // {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                // {provide: AuthenticationService, useClass: MockAuthenticationService},
                // {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(ActorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // todo 2058 test hasRole

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
