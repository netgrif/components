import {TestBed} from '@angular/core/testing';

import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ProcessService} from './process.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {PetriNetResourceService} from '../resources/engine-endpoint/petri-net-resource.service';
import {of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoggerService} from '../logger/services/logger.service';

describe('ProcessService', () => {
    let service: ProcessService;
    let logSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpClient,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: PetriNetResourceService, useClass: MyPetriNetResource},
                ProcessService
            ]
        });
        service = TestBed.inject(ProcessService);
        logSpy = spyOn(TestBed.inject(LoggerService), 'error');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('get petri net', () => {
        service.getNet('true').subscribe(res => {
            expect(res.stringId).toEqual('true');
        });
        service.getNet('true').subscribe(res => {
            expect(res.stringId).toEqual('true');
        });
        service.getNet('false').subscribe(res => {
            expect(res.stringId).toEqual('false');
        });

        service.getNet('error1').subscribe();
        expect(logSpy).toHaveBeenCalled();

        service.getNet('error2').subscribe();
        expect(logSpy).toHaveBeenCalled();

        service.getNet('error3').subscribe();
        expect(logSpy).toHaveBeenCalled();

        service.getNet('err').subscribe();
        expect(logSpy).toHaveBeenCalled();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

class MyPetriNetResource {
    getOne(identifier, version) {
        if (identifier === 'true') {
            return of({
                stringId: 'true',
                title: 'string',
                identifier: 'string',
                version: 'string',
                initials: 'string',
                defaultCaseName: 'string',
                createdDate: [2020, 1, 1, 1, 1],
                author: {email: 'mail', fullName: 'name'},
                immediateData: [],
            });
        } else if (identifier === 'false' || identifier === 'error1' || identifier === 'error2' || identifier === 'error3') {
            return of({
                stringId: identifier,
                title: 'string',
                identifier: 'string',
                version: 'string',
                initials: 'string',
                defaultCaseName: 'string',
                createdDate: [2020, 1, 1, 1, 1],
                author: {email: 'mail', fullName: 'name'},
                immediateData: [],
            });
        } else {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }

    getPetriNetTranstions(identifier) {
        if (identifier === 'true') {
            return of([]);
        } else if (identifier === 'false' || identifier === 'error1' || identifier === 'error2') {
            return of({});
        } else {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }

    getPetriNetTransactions(identifier) {
        if (identifier === 'true') {
            return of([]);
        } else if (identifier === 'false' || identifier === 'error1') {
            return of({});
        } else {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }

    getPetriNetRoles(identifier) {
        if (identifier === 'true') {
            return of([]);
        } else if (identifier === 'false') {
            return of({});
        } else {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }
}
