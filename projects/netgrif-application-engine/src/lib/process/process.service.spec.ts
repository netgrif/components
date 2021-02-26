import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ProcessService} from './process.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {PetriNetResourceService} from '../resources/engine-endpoint/petri-net-resource.service';
import {of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoggerService} from '../logger/services/logger.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationMethodService} from '../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../utility/tests/mocks/mock-authentication-method-service';

describe('ProcessService', () => {
    let service: ProcessService;
    let logSpy: jasmine.Spy;
    let logInfoSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: PetriNetResourceService, useClass: MyPetriNetResource},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                ProcessService
            ]
        });
        service = TestBed.inject(ProcessService);
        logSpy = spyOn(TestBed.inject(LoggerService), 'error');
        logInfoSpy = spyOn(TestBed.inject(LoggerService), 'info');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call one net', () => {
        const getOneSpy = spyOn(TestBed.inject(PetriNetResourceService), 'getOne').and.callThrough();
        service.getNet('true').subscribe();
        expect(getOneSpy).toHaveBeenCalled();
    });

    it('should call more nets', () => {
        const getOneSpy = spyOn(TestBed.inject(PetriNetResourceService), 'getOne').and.callThrough();
        service.getNets(['true', 'false']).subscribe();
        expect(getOneSpy).toHaveBeenCalledTimes(2);
    });

    it('get petri net errors', () => {
        service.getNet('false').subscribe();
        expect(logInfoSpy).toHaveBeenCalled();

        service.getNet('error1').subscribe();
        expect(logSpy).toHaveBeenCalled();

        service.getNet('error2').subscribe();
        expect(logSpy).toHaveBeenCalled();

        service.getNet('error3').subscribe();
        expect(logSpy).toHaveBeenCalled();

        service.getNet('err').subscribe();
        expect(logSpy).toHaveBeenCalled();
    });

    // NAE-1085
    it('getNets should emit with empty argument', (done) => {
        service.getNets([]).subscribe(result => {
            expect(result).toEqual([]);
            done();
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

class MyPetriNetResource {
    getOne(identifier, version) {
        if (identifier === 'true' ||
            identifier === 'false' ||
            identifier === 'error1' ||
            identifier === 'error2' ||
            identifier === 'error3') {
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

    getPetriNetTransitions(identifier) {
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
