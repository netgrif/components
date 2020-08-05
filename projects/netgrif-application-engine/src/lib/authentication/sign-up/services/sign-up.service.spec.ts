import {inject, TestBed} from '@angular/core/testing';

import {SignUpService} from './sign-up.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SignUpService', () => {
    let service: SignUpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                SignUpService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(SignUpService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should signup', inject([HttpTestingController],
        (httpMock: HttpTestingController) => {
            service.signup({ token: 'string', email: 'string', name: 'string', surname: 'string', password: 'string'}).subscribe(res => {
                expect(res.success).toEqual('Done');
            });

            const reqLog = httpMock.expectOne('http://localhost:8080/api/auth/signup');
            expect(reqLog.request.method).toEqual('POST');

            reqLog.flush({success: 'Done'});
        })
    );

    it('should verify token', inject([HttpTestingController],
        (httpMock: HttpTestingController) => {
            service.verify('string').subscribe(res => {
                expect(res.success).toEqual('username');
            });

            const reqLog = httpMock.expectOne('http://localhost:8080/api/auth/token/verify');
            expect(reqLog.request.method).toEqual('POST');

            reqLog.flush({success: 'username'});
        })
    );

    it('should invite', inject([HttpTestingController],
        (httpMock: HttpTestingController) => {
            service.invite({email: 'user@user.sk', groups: [], processRoles: []}).subscribe(res => {
                console.log(res);
            }, (error) => {
                expect(error).toEqual('Done');
            });

            const reqLog = httpMock.expectOne('http://localhost:8080/api/auth/invite');
            expect(reqLog.request.method).toEqual('POST');

            reqLog.flush({success: 'Done'});
        })
    );

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
