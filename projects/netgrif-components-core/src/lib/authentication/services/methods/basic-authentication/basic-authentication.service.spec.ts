import {inject, TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BasicAuthenticationService} from './basic-authentication.service';
import {AuthenticationMethodService} from '../../authentication-method.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationMethodService} from '../../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {MockAuthenticationService} from '../../../../utility/tests/mocks/mock-authentication.service';

describe('BasicAuthenticationService', () => {
    let service: BasicAuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                BasicAuthenticationService
            ]
        });
        service = TestBed.inject(BasicAuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login', (done) => {
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {

                service.login({username: 'name', password: 'pass'}).subscribe(res => {
                    expect(res.id).toEqual('id');
                    done();
                });

                const reqLog = httpMock.expectOne('http://localhost:8080/api/auth/login');
                expect(reqLog.request.method).toEqual('GET');

                reqLog.flush({email: 'mail', id: 'id', name: 'name', surname: 'surname'});
            }
        )();
    });

    it('should logout', (done) => {
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {

                service.logout().subscribe(res => {
                    expect(res['success']).toEqual('success');
                    done();
                });

                const req = httpMock.expectOne('http://localhost:8080/api/auth/logout');
                expect(req.request.method).toEqual('POST');

                req.flush({success: 'success'});
            }
        )();
    });

    it('should decode non-latin characters', (done) => {
        const encoded = btoa(encodeURIComponent('šššččč'));
        const decoded = decodeURIComponent(atob(encoded));
        expect(decoded).toEqual('šššččč');
        done();
    });

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
        TestBed.resetTestingModule();
    }));
});

