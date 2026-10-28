import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';
import {TaskResourceService} from './task-resource.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TaskResourceService', () => {
    let service: TaskResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(TaskResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should count', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.count(new SimpleFilter('', FilterType.TASK, {})).subscribe(res => {
                        expect(res.count).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/count');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({count: 0, entity: ''});
                })();
        }
    );

    it('should getAllTask', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getAllTask().subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

    it('should assignTask', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.assignTask('id').subscribe(res => {
                        expect(res.success).toEqual('Success');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/assign/id?fields=outcomes,outcome,task(stringId)');
                    expect(reqLog.request.method).toEqual('GET');
                    expect(reqLog.request.params.has('fields')).toBeTrue();
                    expect(reqLog.request.params.get('fields')).toEqual('outcomes,outcome,task(stringId)');

                    reqLog.flush({success: 'Success'});
                })();
        }
    );

    it('should cancelTask', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.cancelTask('id').subscribe(res => {
                        expect(res.success).toEqual('Success');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/cancel/id?fields=outcomes,outcome,task(stringId)');
                    expect(reqLog.request.method).toEqual('GET');
                    expect(reqLog.request.params.has('fields')).toBeTrue();
                    expect(reqLog.request.params.get('fields')).toEqual('outcomes,outcome,task(stringId)');

                    reqLog.flush({success: 'Success'});
                })();
        }
    );

    it('should delegateTask', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.delegateTask('id', {userId: 5}).subscribe(res => {
                        expect(res.success).toEqual('Success');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/delegate/id?fields=outcomes,outcome,task(stringId)');
                    expect(reqLog.request.method).toEqual('POST');
                    expect(reqLog.request.params.has('fields')).toBeTrue();
                    expect(reqLog.request.params.get('fields')).toEqual('outcomes,outcome,task(stringId)');

                    reqLog.flush({success: 'Success'});
                })();
        }
    );

    it('should finishTask', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.finishTask('id').subscribe(res => {
                        expect(res.success).toEqual('Success');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/finish/id?fields=outcomes,outcome,task(stringId)');
                    expect(reqLog.request.method).toEqual('GET');
                    expect(reqLog.request.params.has('fields')).toBeTrue();
                    expect(reqLog.request.params.get('fields')).toEqual('outcomes,outcome,task(stringId)');

                    reqLog.flush({success: 'Success'});
                })();
        }
    );

    it('should searchTask', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.searchTask(new SimpleFilter('', FilterType.TASK, {})).subscribe(res => {
                        expect(res.content.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/search_es');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getTasks', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getTasks(SimpleFilter.emptyTaskFilter()).subscribe(res => {
                        expect(res.content.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/search');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getAllTasksByCases', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getAllTasksByCases({}).subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/case');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getAllTasksByCase', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getAllTasksByCase('id').subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/case/id');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getAllMyTasks', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getAllMyTasks().subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/my');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getAllFinishedTask', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getAllFinishedTask().subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/my/finished');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getData', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getData('id').subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/id/data?fields=outcomes,task(stringId),data');
                    expect(reqLog.request.method).toEqual('GET');
                    expect(reqLog.request.params.has('fields')).toBeTrue();
                    expect(reqLog.request.params.get('fields')).toEqual('outcomes,task(stringId),data');

                    reqLog.flush({
                        success: 'Get data groups successful',
                        outcome: {
                            outcomes: [],
                            net: {},
                            aCase: {},
                            task: {},
                            data: []
                        }
                    });
                })();
        }
    );

    it('should setData', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.setData('id', {}).subscribe(res => {
                        expect(res.outcome).toBeTruthy();
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/task/id/data?fields=outcomes,outcome,case(stringId),task(stringId),changedFields');
                    expect(reqLog.request.method).toEqual('POST');
                    expect(reqLog.request.params.has('fields')).toBeTrue();
                    expect(reqLog.request.params.get('fields')).toEqual('outcomes,outcome,case(stringId),task(stringId),changedFields');

                    reqLog.flush({outcome: {}});
                })();
        }
    );

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
        TestBed.resetTestingModule();
    }));
});
