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

    it('should call one net', (done) => {
        const getOneSpy = spyOn(TestBed.inject(PetriNetResourceService), 'getOne').and.callThrough();
        service.getNet('correct').subscribe(() => {
            expect(getOneSpy).toHaveBeenCalled();
            done();
        });
    });

    it('should call more nets', (done) => {
        const getOneSpy = spyOn(TestBed.inject(PetriNetResourceService), 'getOne').and.callThrough();
        service.getNets(['correct', 'emptySecondaries']).subscribe(() => {
            expect(getOneSpy).toHaveBeenCalledTimes(2);
            done();
        });
    });

    it('get petri net errors - net without transitions/roles', (done) => {
        service.getNet('emptySecondaries').subscribe(() => {
            expect(logInfoSpy).toHaveBeenCalled();
            done();
        });
    });

    it('get petri net errors - roles fail to load', (done) => {
        service.getNet('errorOnRoles').subscribe(() => {
            expect(logSpy).toHaveBeenCalled();
            done();
        });
    });

    it('get petri net errors - transitions fail to load', (done) => {
        service.getNet('errorOnTransitions').subscribe(() => {
            expect(logSpy).toHaveBeenCalled();
            done();
        });
    });

    it('get petri net errors - net fails to load', (done) => {
        service.getNet('err').subscribe(() => {
            expect(logSpy).toHaveBeenCalled();
            done();
        });
    });

    // NAE-1085
    it('getNets should emit with empty argument', (done) => {
        service.getNets([]).subscribe(result => {
            expect(result).toEqual([]);
            done();
        });
    });

    it('second request should return cached net', (done) => {
        const getOneSpy = spyOn(TestBed.inject(PetriNetResourceService), 'getOne').and.callThrough();
        service.getNet('correct').subscribe(net => {
            service.getNet('correct').subscribe(net2 => {
                expect(getOneSpy).toHaveBeenCalledTimes(1);
                expect(net === net2).toBeTrue();
                done();
            });
        });
    });

    it('force should bypass net cache', (done) => {
        const getOneSpy = spyOn(TestBed.inject(PetriNetResourceService), 'getOne').and.callThrough();
        service.getNet('correct').subscribe(net => {
            service.getNet('correct', true).subscribe(net2 => {
                expect(getOneSpy).toHaveBeenCalledTimes(2);
                expect(net === net2).toBeFalse();
                done();
            });
        });
    });

    it('getNetReference should load net with only roles and permissions', (done) => {
        service.getNetReference('correct').subscribe(result => {
            expect(result).toBeTruthy();
            expect(Array.isArray(result.roles)).toBeTrue();
            expect(result.roles.length > 0).toBeTrue();
            done();
        });
    });

    it('should call more net references', (done) => {
        const getOneSpy = spyOn(TestBed.inject(PetriNetResourceService), 'getOne').and.callThrough();
        service.getNetReferences(['correct', 'emptySecondaries']).subscribe(() => {
            expect(getOneSpy).toHaveBeenCalledTimes(2);
            done();
        });
    });

    it('getNetReferences should emit with empty argument', (done) => {
        service.getNetReferences([]).subscribe(result => {
            expect(result).toEqual([]);
            done();
        });
    });

    it('get petri net reference errors - net without transitions/roles', (done) => {
        service.getNetReference('emptySecondaries').subscribe(() => {
            expect(logInfoSpy).toHaveBeenCalled();
            done();
        });
    });

    // it('get petri net reference errors - roles fail to load', (done) => {
    //     service.getNetReference('errorOnRoles').subscribe(() => {
    //         expect(logSpy).toHaveBeenCalled();
    //         done();
    //     });
    // });

    it('get petri net reference errors - net fails to load', (done) => {
        service.getNetReference('err').subscribe(() => {
            expect(logSpy).toHaveBeenCalled();
            done();
        });
    });

    afterEach(() => {
        logSpy.calls.reset();
        logInfoSpy.calls.reset();
        TestBed.resetTestingModule();
    });
});

class MyPetriNetResource {
    getOne(identifier, version) {
        if (identifier === 'correct' ||
            identifier === 'emptySecondaries' ||
            identifier === 'errorOnRoles' ||
            identifier === 'errorOnTransitions') {
            return of({
                stringId: identifier,
                title: 'string',
                identifier,
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
