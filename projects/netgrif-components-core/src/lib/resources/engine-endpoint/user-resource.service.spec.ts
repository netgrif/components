import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {UserResourceService} from './user-resource.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('UserResourceService', () => {
    let service: UserResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(UserResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should assignAuthority', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.assignAuthority('id', {}).subscribe(res => {
                        expect(res.success).toEqual('Success');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user/id/authority/assign');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({success: 'Success'});
                })();
        }
    );

    it('should assignRoles', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.assignRoles('id', {}).subscribe(res => {
                        expect(res.success).toEqual('Success');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user/id/role/assign');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({success: 'Success'});
                })();
        }
    );

    it('should getAllAuthorities', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getAllAuthorities().subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user/authority');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

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

    it('should getLoggedUser', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getLoggedUser().subscribe(res => {
                        expect(res.id).toEqual('5');
                        expect(res.email).toEqual('string');
                        expect(res.fullName).toEqual('string string');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user/me');
                    expect(reqLog.request.method).toEqual('GET');

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

    it('should getUser', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getUser('5').subscribe(res => {
                        expect(res.id).toEqual('5');
                        expect(res.email).toEqual('string');
                        expect(res.fullName).toEqual('string string');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user/5');
                    expect(reqLog.request.method).toEqual('GET');

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

    it('should getPreferences', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getPreferences().subscribe(res => {
                        expect(res).toBeTruthy();
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user/preferences');
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

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/user/preferences');
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
                        expect(res.email).toEqual('string');
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
