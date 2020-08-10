import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BasicAuthenticationService} from './basic-authentication.service';
import {AuthenticationModule} from '../../../authentication.module';
import {AuthenticationMethodService} from '../../authentication-method.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {RouterTestingModule} from '@angular/router/testing';

describe('BasicAuthenticationService', () => {
    let service: BasicAuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AuthenticationModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                AuthenticationMethodService,
                HttpClient,
                BasicAuthenticationService
            ]
        });
        service = TestBed.inject(BasicAuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login and logout', inject([HttpClient, HttpTestingController],
        fakeAsync((http: HttpClient, httpMock: HttpTestingController) => {

            service.login({username: 'name', password: 'pass'}).subscribe(res => {
                expect(res.id).toEqual('id');
            });

            tick(1000);

            const reqLog = httpMock.expectOne('http://localhost:8080/api/auth/login');
            expect(reqLog.request.method).toEqual('GET');

            reqLog.flush({email: 'mail', id: 'id', name: 'name', surname: 'surname'});

            service.logout().subscribe(res => {
                expect(res['success']).toEqual('success');
            });

            const req = httpMock.expectOne('http://localhost:8080/api/auth/logout');
            expect(req.request.method).toEqual('POST');

            req.flush({success: 'success'});
        })
    ));

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

