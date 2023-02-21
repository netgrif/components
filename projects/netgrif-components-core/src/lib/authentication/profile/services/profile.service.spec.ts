import {inject, TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ProfileService} from './profile.service';
import {NetgrifApplicationEngine} from "../../../../commons/schema";
import {UserChangePasswordRequest} from "../models/user-change-password-request";

describe('ProfileService', () => {
    let service: ProfileService;
    let body: UserChangePasswordRequest = {
        login: 'test@test.com',
        password: 'password',
        newPassword: 'NewPassword'
    }

    describe('standard endpoints configuration', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])],
                providers: [
                    ProfileService,
                    {provide: ConfigurationService, useClass: TestConfigurationService}
                ]
            });
            service = TestBed.inject(ProfileService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should changePassword', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.changePassword(body).subscribe(res => {
                        expect(res.success).toEqual('Done');
                        done();
                    });
                    const reqLog = httpMock.expectOne('http://localhost:8080/api/auth/changePassword');
                    expect(reqLog.request.method).toEqual('POST');
                    reqLog.flush({success: 'Done'});
                })();
        });

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
                    ProfileService,
                    {provide: ConfigurationService, useClass: MissingEndpointsConfigurationService}
                ]
            });
            service = TestBed.inject(ProfileService);
        });

        it('should not resolve undefined endpoints', () => {
            expect(service).toBeTruthy();
            expect(() => {
                service.changePassword(body);
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
                    },
                    sessionBearer: 'X-Auth-Token'
                },
                resources: []
            }
        } as unknown as NetgrifApplicationEngine);
    }
}
