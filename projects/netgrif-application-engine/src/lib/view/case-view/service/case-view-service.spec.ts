import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CaseViewService} from './case-view-service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {Observable, of} from 'rxjs';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {SearchService} from '../../../search/search-service/search.service';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Page} from '../../../resources/interface/page';
import {tap, delay} from 'rxjs/operators';
import {Case} from '../../../resources/interface/case';
import {createMockCase} from '../../../utility/tests/utility/create-mock-case';
import {ElementaryPredicate} from '../../../search/models/predicate/elementary-predicate';
import {Query} from '../../../search/models/query/query';
import {UserService} from '../../../user/services/user.service';
import {MockUserService} from '../../../utility/tests/mocks/mock-user.service';
import {NAE_BASE_FILTER} from '../../../search/models/base-filter-injection-token';
import {TestCaseBaseFilterProvider, TestCaseViewAllowedNetsFactory} from '../../../utility/tests/test-factory-methods';
import {AllowedNetsService} from '../../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../../allowed-nets/services/factory/allowed-nets-service-factory';
import {PermissionService} from '../../../authorization/permission/permission.service';


describe('CaseViewService', () => {
    let service: CaseViewService;
    let caseService: MyResources;
    let searchService: SearchService;
    let userService: UserService;
    let permissionService: PermissionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                CaseViewService,
                {provide: CaseResourceService, useClass: MyResources},
                {provide: UserService, useClass: MockUserService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SearchService,
                PermissionService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        });
        service = TestBed.inject(CaseViewService);
        caseService = TestBed.inject(CaseResourceService) as unknown as MyResources;
        searchService = TestBed.inject(SearchService);
        userService = TestBed.inject(UserService);
        permissionService = TestBed.inject(PermissionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load cases', done => {
        caseService.setResponse(1000, [createMockCase('case')]);
        let c = 0;
        service.cases$.subscribe(receivedCases => {
            expect(receivedCases).toBeTruthy();
            expect(Array.isArray(receivedCases)).toBeTrue();
            if (c === 1) {
                expect(receivedCases.length).toEqual(1);
                expect(receivedCases[0].stringId).toEqual('case');
            }
            c++;
            done();
        });
    });

    // NAE-968
    it('should process second filter change before first filter call returns', fakeAsync(() => {
        let cases: Array<Case>;

        service.cases$.subscribe(receivedCases => {
            cases = receivedCases;
        });

        let received1 = false;
        caseService.setResponse(3000, [createMockCase('mock')], () => {
            received1 = true;
        });

        let oldActiveFilter = searchService.activeFilter;
        searchService.addPredicate(new ElementaryPredicate(new Query('q1')));
        expect(oldActiveFilter !== searchService.activeFilter).toBeTrue();

        tick(400);
        expect(service.loading).toBeTrue();

        let received2 = false;
        caseService.setResponse(600, [createMockCase('mock1'), createMockCase('mock2')], () => {
            received2 = true;
        });

        oldActiveFilter = searchService.activeFilter;
        searchService.addPredicate(new ElementaryPredicate(new Query('q2')));
        expect(oldActiveFilter !== searchService.activeFilter).toBeTrue();

        tick(1000);
        expect(service.loading).toBeTrue();

        tick(5000);
        expect(service.loading).toBeFalse();
        expect(received1).toBeTrue();
        expect(received2).toBeTrue();
        expect(cases).toBeTruthy();
        expect(Array.isArray(cases)).toBeTrue();
        expect(cases.length).toEqual(2);
        expect(cases[0].stringId).toEqual('mock1');
        expect(cases[1].stringId).toEqual('mock2');
    }));

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

class MyResources {
    private delay = 0;
    private result: Array<Case> = [];
    private callback: () => void = () => {};

    setResponse(_delay: number, cases: Array<Case>, callback: () => void = () => {}) {
        this.delay = _delay;
        this.result = cases;
        this.callback = callback;
    }

    searchCases(): Observable<Page<Case>> {
        const callback = this.callback;
        const content = [...this.result];
        return of({
            content,
            pagination: {
                size: content.length,
                totalElements: content.length,
                totalPages: 1,
                number: 0
            }
        }).pipe(delay(this.delay),
            tap(() => {
                callback();
            })
        );
    }
}
