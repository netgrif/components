import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CaseResourceService} from './case-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CreateCaseEventOutcome} from '../../event/model/event-outcomes/case-outcomes/create-case-event-outcome';
import {HttpParams} from "@angular/common/http";

describe('CaseResourceService', () => {
    let service: CaseResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(CaseResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should count', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.count(new SimpleFilter('', FilterType.CASE, {})).subscribe(res => {
                        expect(res.count).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/workflow/case/count');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({count: 0, entity: ''});
                })();
        }
    );

    it('should getAllCases', (done) => {
        inject([HttpTestingController],
        (httpMock: HttpTestingController) => {
            service.getAllCase().subscribe(res => {
                expect(res.length).toEqual(0);
                done();
            });

            const reqLog = httpMock.expectOne('http://localhost:8080/api/workflow/all');
            expect(reqLog.request.method).toEqual('GET');

            reqLog.flush([]);
        })();
    }
    );

    it('should searchCases', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.searchCases(new SimpleFilter('', FilterType.CASE, {})).subscribe(res => {
                        expect(res.content.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/workflow/case/search');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush([]);
                })();
        }
    );

    it('should deleteCase', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.deleteCase('id').subscribe(res => {
                        expect(res.success).toEqual('Done');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/workflow/case/id');
                    expect(reqLog.request.method).toEqual('DELETE');

                    reqLog.flush({success: 'Done'});
                })();
        }
    );

    it('should getCaseFile', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getCaseFile('id', new HttpParams()).subscribe(res => {
                        expect(res.description).toEqual('string');
                        expect(res.filename).toEqual('name');
                        expect(res.open).toBeFalse();
                        expect(res.readable).toBeFalse();
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/workflow/case/id/file');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush({description: 'string', filename: 'name', open: false, readable: false});
                })();
        }
    );

    it('should createCase', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.createCase({
                        title: '',
                        netId: ''
                    }).subscribe(res => {
                        expect((res.outcome as CreateCaseEventOutcome).case.stringId).toEqual('string');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/workflow/case/');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({
                        outcome: {
                            case: {
                                stringId: 'string'
                            }
                        }
                    });
                })();
        }
    );

    it('should getAllCaseUser', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getAllCaseUser('id', {}).subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/workflow/case/author/id');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getCasesQueryDSL', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getCasesQueryDSL({}).subscribe(res => {
                        expect(res.content.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/workflow/case/search2');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getOptionsEnumeration', (done) => {
        inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getOptionsEnumeration('id', 'id').subscribe(res => {
                        expect(res.stringId).toEqual('id');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/workflow/case/id/field/id');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush({stringId: 'id'});
                })();
        }
    );

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
        TestBed.resetTestingModule();
    }));
});
