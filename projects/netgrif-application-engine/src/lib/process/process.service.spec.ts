import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ProcessService} from './process.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {PetriNetResourceService} from '../resources/engine-endpoint/petri-net-resource.service';
import {Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoggerService} from '../logger/services/logger.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationMethodService} from '../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../utility/tests/mocks/mock-authentication-method-service';
import RolesAndPermissions from './rolesAndPermissions';
import Transaction from './transaction';
import Transition from './transition';

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
        service.getNet('correct').subscribe();
        expect(getOneSpy).toHaveBeenCalled();
    });

    it('should call more nets', () => {
        const getOneSpy = spyOn(TestBed.inject(PetriNetResourceService), 'getOne').and.callThrough();
        service.getNets(['correct', 'emptySecondaries']).subscribe();
        expect(getOneSpy).toHaveBeenCalledTimes(2);
    });

    it('get petri net errors - net without transitions/transactions/roles', () => {
        service.getNet('emptySecondaries', true).subscribe();
        expect(logInfoSpy).toHaveBeenCalled();
    });

    it('get petri net errors - roles fail to load', () => {
        service.getNet('errorOnRoles', true).subscribe();
        expect(logSpy).toHaveBeenCalled();
    });

    it('get petri net errors - transactions fail to load', () => {
        service.getNet('errorOnTransactions', true).subscribe();
        expect(logSpy).toHaveBeenCalled();
    });

    it('get petri net errors - transitions fail to load', () => {
        service.getNet('errorOnTransitions', true).subscribe();
        expect(logSpy).toHaveBeenCalled();
    });

    it('get petri net errors - net "err"', () => {
        service.getNet('err', true).subscribe();
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
        if (identifier === 'correct' ||
            identifier === 'emptySecondaries' ||
            identifier === 'errorOnRoles' ||
            identifier === 'errorOnTransactions' ||
            identifier === 'errorOnTransitions') {
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

    getPetriNetTransitions(identifier): Observable<Array<Transition>> {
        if (identifier === 'correct') {
            return of([{
                stringId: 't1',
                title: '',
                petriNetId: 'petriNetId',
                immediateData: []
            }]);
        } else if (identifier === 'emptySecondaries' || identifier === 'errorOnRoles' || identifier === 'errorOnTransactions') {
            return of([]);
        } else {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }

    getPetriNetTransactions(identifier): Observable<Array<Transaction>> {
        if (identifier === 'correct') {
            return of([{
                transitions: [],
                title: ''
            }]);
        } else if (identifier === 'emptySecondaries' || identifier === 'errorOnRoles') {
            return of([]);
        } else {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }

    getPetriNetRoles(identifier): Observable<RolesAndPermissions> {
        if (identifier === 'correct') {
            return of({
                processRoles: [{stringId: 'roleId', name: 'role'}],
                permissions: {}
            });
        } else if (identifier === 'emptySecondaries') {
            return of({
                processRoles: [],
                permissions: {}
            });
        } else {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }
}
