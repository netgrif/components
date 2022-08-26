import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {PetriNetResourceService} from './petri-net-resource.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('PetriNetResourceService', () => {
    let service: PetriNetResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(PetriNetResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should getAll', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getAll().subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/petrinet');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getDataPetriNet', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getDataPetriNet({}).subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/petrinet/data');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getPetriNetTranstions', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getPetriNetTransitions('id').subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/petrinet/transitions?ids=id');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getPetriNetTransactions', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getPetriNetTransactions('id').subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/petrinet/id/transactions');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getNetFile', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getNetFile('id').subscribe(res => {
                        expect(res.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/petrinet/id/file');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush([]);
                })();
        }
    );

    it('should getPetriNetRoles', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getPetriNetRoles('id').subscribe(res => {
                        expect(res.processRoles.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/petrinet/id/roles');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush({processRoles: []});
                })();
        }
    );

    it('should getOne', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getOne('id', 'vers').subscribe(res => {
                        expect(res.stringId).toEqual('string');
                        done();
                    });

                    const reqLog = httpMock.expectOne(`http://localhost:8080/api/petrinet/${btoa('id')}/vers`);
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush({stringId: 'string'});
                })();
        }
    );

    it('should getOneById', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.getOneById('id').subscribe(res => {
                        expect(res.petriNetReferences[0].stringId).toEqual('string');
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/petrinet/id');
                    expect(reqLog.request.method).toEqual('GET');

                    reqLog.flush({petriNetReferences: [{stringId: 'string'}]});
                })();
        }
    );

    it('should searchPetriNets', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    service.searchPetriNets({}).subscribe(res => {
                        expect(res.content.length).toEqual(0);
                        done();
                    });

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/petrinet/search');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush([]);
                })();
        }
    );

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
        TestBed.resetTestingModule();
    }));
});
