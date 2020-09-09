import {inject, TestBed} from '@angular/core/testing';
import {AuthenticationInterceptor} from './authentication-interceptor';
import {AuthenticationMethodService} from './authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HTTP_INTERCEPTORS, HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SessionService} from '../session/services/session.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {LoggerService} from '../../logger/services/logger.service';

describe('AuthenticationInterceptor', () => {
    let service: SessionService;
    let warnSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SessionService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthenticationInterceptor,
                    multi: true
                }
            ]
        });
        service = TestBed.inject(SessionService);
        warnSpy = spyOn(TestBed.inject(LoggerService), 'warn');
    });

    describe('intercept HTTP request', () => {
        it('should add Authentication bearer to Headers', inject([HttpClient, HttpTestingController],
            (http: HttpClient, mock: HttpTestingController) => {

                service.sessionToken = 'session-token';
                http.get('/api').subscribe(response => {
                    expect(response).toBeTruthy();
                });
                const request = mock.expectOne(req => (req.headers.has('X-Auth-Token')));

                request.flush({data: 'test'}, {headers: new HttpHeaders({'X-Auth-Token': 'tokenos'})});
                mock.verify();
            }));
    });

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
        TestBed.resetTestingModule();
    }));
});
