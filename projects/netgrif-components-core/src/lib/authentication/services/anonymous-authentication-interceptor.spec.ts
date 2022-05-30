import {inject, TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HTTP_INTERCEPTORS, HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerService} from '../../logger/services/logger.service';
import {AnonymousService} from '../anonymous/anonymous.service';
import {AnonymousAuthenticationInterceptor} from './anonymous-authentication-interceptor';

describe('AnonymousAuthenticationInterceptor', () => {
    let service: AnonymousService;
    let warnSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                AnonymousService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AnonymousAuthenticationInterceptor,
                    multi: true
                }
            ]
        });
        service = TestBed.inject(AnonymousService);
        warnSpy = spyOn(TestBed.inject(LoggerService), 'warn');
    });

    describe('intercept HTTP request', () => {
        it('should add JWT bearer to Headers', (done) => {
            inject([HttpClient, HttpTestingController],
                (http: HttpClient, mock: HttpTestingController) => {

                    service.setToken('jwt-token');
                    http.get('/api').subscribe(response => {
                        expect(response).toBeTruthy();
                        done();
                    });
                    const request = mock.expectOne(req => (req.headers.has('X-Jwt-Token')));

                    request.flush({data: 'test'}, {headers: new HttpHeaders({'X-Jwt-Token': 'tokenos'})});
                    mock.verify();
                })();
        });
        afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
            mock.verify();
            TestBed.resetTestingModule();
        }));
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
