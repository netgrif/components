import {inject, TestBed} from '@angular/core/testing';
import {SignUpService} from './sign-up.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {NetgrifApplicationEngine} from '../../../../commons/schema';

describe('SignUpService', () => {
    let service: SignUpService;

    describe('standard endpoints configuration', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])],
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

        it('should signup', (done) => {
            inject([HttpTestingController],
                    (httpMock: HttpTestingController) => {
                        service.signup({token: 'string', name: 'string', surname: 'string', password: 'string'}).subscribe(res => {
                            expect(res.success).toEqual('Done');
                            done();
                        });

                        const reqLog = httpMock.expectOne('http://localhost:8080/api/auth/signup');
                        expect(reqLog.request.method).toEqual('POST');

                        reqLog.flush({success: 'Done'});
                    })();
            }
        );

        it('should verify token', (done) => {
            inject([HttpTestingController],
                    (httpMock: HttpTestingController) => {
                        service.verify('string').subscribe(res => {
                            expect(res.success).toEqual('username');
                            done();
                        });

                        const reqLog = httpMock.expectOne('http://localhost:8080/api/auth/token/verify');
                        expect(reqLog.request.method).toEqual('POST');

                        reqLog.flush({success: 'username'});
                    })();
            }
        );

        it('should invite', (done) => {
            inject([HttpTestingController],
                    (httpMock: HttpTestingController) => {
                        service.invite({email: 'user@user.sk', groups: [], processRoles: []}).subscribe(res => {
                            expect(res.success).toEqual('Done');
                            done();
                        });

                        const reqLog = httpMock.expectOne('http://localhost:8080/api/auth/invite');
                        expect(reqLog.request.method).toEqual('POST');

                        reqLog.flush({success: 'Done'});
                    })();
            }
        );

        afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
            mock.verify();
            TestBed.resetTestingModule();
        }));
    });

    describe('no endpoints configuration', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])],
                providers: [
                    SignUpService,
                    {provide: ConfigurationService, useClass: MissingEndpointsConfigurationService}
                ]
            });
            service = TestBed.inject(SignUpService);
        });

        // NAE-1072
        it('should not resolve undefined endpoints', () => {
            expect(service).toBeTruthy();
            expect(() => {
                service.signup({token: '', name: '', surname: '', password: ''});
            }).toThrowError('SingUp URL is not set in authentication provider endpoints!');
            expect(() => {
                service.invite({email: '', groups: [], processRoles: []});
            }).toThrowError('Invite URL is not set in authentication provider endpoints!');
            expect(() => {
                service.resetPassword('');
            }).toThrowError('Reset URL is not set in authentication provider endpoints!');
            expect(() => {
                service.recoverPassword('', '');
            }).toThrowError('Recover URL is not set in authentication provider endpoints!');
            expect(() => {
                service.verify('');
            }).toThrowError('Verify URL is not set in authentication provider endpoints!');
        });

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });
});

class MissingEndpointsConfigurationService extends ConfigurationService {
    constructor() {
        super({
            extends: 'nae-default',
            providers: {
                auth: {
                    address: 'http://localhost:8080/api/',
                    authentication: 'Basic',
                    endpoints: {
                        login: 'auth/login',
                        logout: 'auth/logout',
                        verification: 'auth/verify'
                    },
                    sessionBearer: 'X-Auth-Token'
                },
                resources: []
            }
        } as unknown as NetgrifApplicationEngine);
    }
}
