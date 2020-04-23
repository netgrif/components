import {inject, TestBed} from '@angular/core/testing';
import {AuthenticationInterceptor} from './authentication-interceptor';
import {AuthenticationMethodService} from './authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HTTP_INTERCEPTORS, HttpClient, HttpHeaderResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SessionService} from '../session/services/session.service';

describe('AuthenticationInterceptor', () => {
    let service: SessionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SessionService,
                AuthenticationMethodService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthenticationInterceptor,
                    multi: true
                }
            ]
        });
        service = TestBed.inject(SessionService);
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
    }));
});
