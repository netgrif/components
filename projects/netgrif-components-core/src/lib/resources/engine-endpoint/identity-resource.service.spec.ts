import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {IdentityResourceService} from './identity-resource.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('IdentityResourceService', () => {
    let service: IdentityResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(IdentityResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should getAll', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getAll().subscribe(res => {
                        expect(res.content.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getAllWithRole', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getAllWithRole({}).subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user/role');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getLoggedIdentity', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getLoggedIdentity().subscribe(res => {
                        expect(res.id).toEqual('5');
                        expect(res.username).toEqual('string');
                        expect(res.fullName).toEqual('string string');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/identity/me');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush({
                        id: '5',
                        email: 'string',
                        firstname: 'string',
                        lastname: 'string',
                        fullName: 'string string',
                        // todo 2058 active actor id
                        _links: {}
                    });
                })();
        }
    );

    it('should getIdentity', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getUser('5').subscribe(res => {
                        expect(res.id).toEqual('5');
                        expect(res.username).toEqual('string');
                        expect(res.fullName).toEqual('string string');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/identity/5');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush({
                        id: '5',
                        email: 'string',
                        firstname: 'string',
                        lastname: 'string',
                        fullName: 'string string',
                        // todo 2058 active actor id
                        _links: {}
                    });
                })();
        }
    );

    it('should getPreferences', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getPreferences().subscribe(res => {
                        expect(res).toBeTruthy();
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/identity/preferences');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush({});
                })();
        }
    );

    it('should setPreferences', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.setPreferences({}).subscribe(res => {
                        expect(res.success).toEqual('Success');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/identity/preferences');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({success: 'Success'});
                })();
        }
    );

    it('should search', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.search({}).subscribe(res => {
                        expect(res.content.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user/search');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush([]);
                })();
        }
    );

    it('should updateUser', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.updateUser('5', {}).subscribe(res => {
                        expect(res.id).toEqual('5');
                        expect(res.username).toEqual('string');
                        expect(res.fullName).toEqual('string string');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user/5');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({
                        id: '5',
                        email: 'string',
                        name: 'string',
                        surname: 'string',
                        fullName: 'string string',
                        groups: [],
                        authorities: [],
                        processRoles: [],
                        _links: {}
                    });
                })();
        }
    );

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
        TestBed.resetTestingModule();
    }));
});
