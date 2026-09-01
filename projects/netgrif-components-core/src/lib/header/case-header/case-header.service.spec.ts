import {TestBed} from '@angular/core/testing';
import {CaseHeaderService} from './case-header.service';
import {HeaderType} from '../models/header-type';
import {HeaderMode} from '../models/header-mode';
import {SearchChangeDescription} from '../models/user-changes/search-change-description';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';
import {SearchService} from '../../search/search-service/search.service';
import {TestCaseBaseFilterProvider, TestCaseViewAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ViewService} from '../../routing/view-service/view.service';
import {TestViewService} from '../../utility/tests/test-view-service';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {CaseMetaField} from './case-menta-enum';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {HeaderChangeType} from '../models/user-changes/header-change-type';
import {EditChangeDescription} from '../models/user-changes/edit-change-description';
import {ModeChangeDescription} from '../models/user-changes/mode-change-description';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {NAE_BASE_FILTER} from '../../search/models/base-filter-injection-token';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {ViewIdService} from '../../user/services/view-id.service';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {HeaderSortingMode} from '../models/header-sorting-mode';
import {Injector} from '@angular/core';
import {NAE_HEADER_SORTING_MODE} from '../models/header-sorting-mode-injection-token';

describe('CaseHeaderService', () => {
    let service: CaseHeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                NoopAnimationsModule,
                TranslateLibModule,
                MatIconModule,
                RouterTestingModule.withRoutes([]),
                SnackBarModule
            ],
            providers: [
                CaseHeaderService,
                CaseViewService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                {provide: ViewIdService, useValue: {viewId: 'case-view'}},
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        });
        service = TestBed.inject(CaseHeaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('get header type = case', () => {
        expect(service.headerType).toEqual(HeaderType.CASE);
    });

    it('should use single sorting by default', () => {
        const firstHeader = service.headerState.selectedHeaders[0];
        const secondHeader = service.headerState.selectedHeaders[1];
        firstHeader.sortDirection = 'asc';
        secondHeader.sortDirection = 'desc';

        service.sortingColumnSelected(firstHeader);
        service.sortingColumnSelected(secondHeader);

        expect(service.sortingMode).toBe(HeaderSortingMode.SINGLE);
        expect(firstHeader.sortDirection).toBe('');
        expect(service.headerState.selectedSorts).toEqual([secondHeader]);
    });

    it('should use multi sorting when explicitly configured', () => {
        const injector = Injector.create({
            providers: [
                CaseHeaderService,
                {provide: NAE_HEADER_SORTING_MODE, useValue: HeaderSortingMode.MULTI}
            ],
            parent: TestBed.inject(Injector)
        });
        const multiService = injector.get(CaseHeaderService);
        const firstHeader = multiService.headerState.selectedHeaders[0];
        const secondHeader = multiService.headerState.selectedHeaders[1];
        firstHeader.sortDirection = 'asc';
        secondHeader.sortDirection = 'desc';

        multiService.sortingColumnSelected(firstHeader);
        multiService.sortingColumnSelected(secondHeader);

        expect(multiService.sortingMode).toBe(HeaderSortingMode.MULTI);
        expect(multiService.headerState.selectedSorts).toEqual([firstHeader, secondHeader]);
        multiService.ngOnDestroy();
    });

    it('should replace a logically identical sort represented by another HeaderColumn instance', () => {
        const injector = Injector.create({
            providers: [
                CaseHeaderService,
                {provide: NAE_HEADER_SORTING_MODE, useValue: HeaderSortingMode.MULTI}
            ],
            parent: TestBed.inject(Injector)
        });
        const multiService = injector.get(CaseHeaderService);
        const original = multiService.headerState.selectedHeaders[0];
        const replacement = new HeaderColumn(
            original.type,
            original.fieldIdentifier,
            original.title,
            original.fieldType,
            original.initial,
            original.petriNetIdentifier
        );
        original.sortDirection = 'asc';
        replacement.sortDirection = 'desc';

        multiService.sortingColumnSelected(original);
        multiService.sortingColumnSelected(replacement);

        expect(original.sortDirection).toBe('');
        expect(multiService.headerState.selectedSorts).toEqual([replacement]);
        multiService.ngOnDestroy();
    });

    it('should combine multi sorting in edit mode with single sorting in normal mode', () => {
        const injector = Injector.create({
            providers: [
                CaseHeaderService,
                {provide: NAE_HEADER_SORTING_MODE, useValue: HeaderSortingMode.COMBINED}
            ],
            parent: TestBed.inject(Injector)
        });
        const combinedService = injector.get(CaseHeaderService);
        const firstHeader = combinedService.headerState.selectedHeaders[0];
        const secondHeader = combinedService.headerState.selectedHeaders[1];
        const thirdHeader = combinedService.headerState.selectedHeaders[2];

        combinedService.changeMode(HeaderMode.EDIT);
        firstHeader.sortDirection = 'asc';
        secondHeader.sortDirection = 'desc';
        combinedService.sortingColumnSelected(firstHeader);
        combinedService.sortingColumnSelected(secondHeader);

        expect(combinedService.sortingMode).toBe(HeaderSortingMode.COMBINED);
        expect(combinedService.headerState.selectedSorts).toEqual([firstHeader, secondHeader]);

        combinedService.confirmEditMode();
        thirdHeader.sortDirection = 'asc';
        combinedService.sortingColumnSelected(thirdHeader);

        expect(combinedService.headerState.mode).toBe(HeaderMode.SORT);
        expect(firstHeader.sortDirection).toBe('');
        expect(secondHeader.sortDirection).toBe('');
        expect(combinedService.headerState.selectedSorts).toEqual([thirdHeader]);
        combinedService.ngOnDestroy();
    });

    it('set allowed nets', () => {
        service.setAllowedNets([{
            stringId: 'string',
            uriNodeId: 'string',
            title: 'string',
            identifier: 'string',
            version: 'string',
            initials: 'string',
            defaultCaseName: 'string',
            createdDate: [2020, 1, 1, 10, 0],
            author: {email: 'email', fullName: 'fullName'},
            immediateData: [{stringId: 'string', title: 'string', type: 'string'}]
        }]);
        expect(service.fieldsGroup.length).toEqual(2);
    });

    it('call sort header changed', (done) => {
        service.headerChange$.subscribe(res => {
            expect(res).toEqual({headerType: HeaderType.CASE, changeType: HeaderChangeType.SORT, description: undefined});
            done();
        });
        service.sortHeaderChanged(0, '', 'asc');
    });

    it('restores a regular sort after edit mode is cancelled', () => {
        const sortedHeader = service.headerState.selectedHeaders[0];
        service.sortHeaderChanged(0, sortedHeader.uniqueId, 'asc');

        expect(service.headerState.selectedSorts).toEqual([sortedHeader]);
        service.changeMode(HeaderMode.EDIT);

        sortedHeader.sortDirection = 'desc';
        service.sortingColumnSelected(sortedHeader);
        service.revertEditMode();

        expect(service.headerState.selectedSorts).toEqual([sortedHeader]);
        expect(sortedHeader.sortDirection).toBe('asc');
    });

    it('restores only the first resolvable preference in single sorting mode', () => {
        const preferences = TestBed.inject(UserPreferenceService);
        const firstHeader = service.headerState.selectedHeaders[0];
        const secondHeader = service.headerState.selectedHeaders[1];
        preferences.setSorts('case-view', [
            {headerUniqueId: 'meta-missing', sortDirection: 'asc'},
            {headerUniqueId: firstHeader.uniqueId, sortDirection: 'desc'},
            {headerUniqueId: secondHeader.uniqueId, sortDirection: 'asc'}
        ]);

        (service as any).loadSortsFromPreferences();

        expect(service.headerState.selectedSorts).toEqual([firstHeader]);
        expect(firstHeader.sortDirection).toBe('desc');
        expect(secondHeader.sortDirection).toBe('');
    });

    it('call search input changed', (done) => {
        service.headerChange$.subscribe(res => {
            expect(res.changeType).toEqual(HeaderChangeType.SEARCH);
            expect((res.description as SearchChangeDescription).columnIdentifier).toEqual(0);
            expect((res.description as SearchChangeDescription).searchInput).toEqual('hladaj');
            expect((res.description as SearchChangeDescription).fieldIdentifier).toEqual('visualId');
            expect((res.description as SearchChangeDescription).type).toEqual(HeaderColumnType.META);
            expect((res.description as SearchChangeDescription).fieldType).toEqual('text');
            done();
        });
        service.headerSearchInputChanged(0, 'hladaj');
    });

    it('call column selected', (done) => {
        service.headerChange$.subscribe(res => {
            expect(res.changeType).toEqual(HeaderChangeType.EDIT);
            expect((res.description as EditChangeDescription).preferredHeaders).toBeTruthy();
            expect((res.description as EditChangeDescription).preferredHeaders[0].title).toEqual('Title');
            done();
        });
        service.headerColumnSelected(0, new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'Title', 'text'));
    });

    it('revert edit mode', (done) => {
        service.changeMode(HeaderMode.SORT);
        service.changeMode(HeaderMode.EDIT);
        service.headerChange$.subscribe(res => {
            if (res.changeType === HeaderChangeType.EDIT) {
                expect(res.changeType).toEqual(HeaderChangeType.EDIT);
                expect((res.description as EditChangeDescription).preferredHeaders).toBeTruthy();
            } else {
                expect(res.changeType).toEqual(HeaderChangeType.MODE_CHANGED);
                expect((res.description as ModeChangeDescription).previousMode).toEqual(HeaderMode.EDIT);
                expect((res.description as ModeChangeDescription).currentMode).toEqual(HeaderMode.SORT);
                done();
            }
        });
        service.revertEditMode();
    });

    it('call change mode', () => {
        const headerState = service.headerState;

        service.changeMode(HeaderMode.EDIT, true);
        service.confirmEditMode();
        expect(service.headerState.mode).toEqual(headerState.mode);
    });

    it('should ignore an empty sorting column', () => {
        expect(() => service.sortingColumnSelected(null)).not.toThrow();
        expect(service.headerState.selectedSorts).toEqual([]);
    });

    it('should preserve sorting when another displayed occurrence of the header remains', () => {
        const sortedHeader = service.headerState.selectedHeaders[0];
        service.headerColumnSelected(1, sortedHeader);
        sortedHeader.sortDirection = 'asc';
        service.sortingColumnSelected(sortedHeader);

        service.headerColumnSelected(0, service.fieldsGroup[0].fields[2]);

        expect(sortedHeader.sortDirection).toBe('asc');
        expect(service.headerState.selectedSorts).toEqual([sortedHeader]);
    });

    it('should apply temporary sorting without changing persisted preferences', () => {
        const preferences = TestBed.inject(UserPreferenceService);
        const setSortsSpy = spyOn(preferences, 'setSorts').and.callThrough();
        const setHeadersAndSortsSpy = spyOn(preferences, 'setHeadersAndSorts').and.callThrough();
        const header = service.headerState.selectedHeaders[0];
        let appliedSorts: Array<HeaderColumn>;
        service.appliedSorts$.subscribe(sorts => appliedSorts = sorts);

        header.sortDirection = 'asc';
        service.sortingColumnSelected(header);
        service.updateSortMode();

        expect(setSortsSpy).not.toHaveBeenCalled();
        expect(setHeadersAndSortsSpy).not.toHaveBeenCalled();
        expect(preferences.getSorts('case-view')).toBeUndefined();
        expect(appliedSorts.length).toBe(1);
        expect(appliedSorts[0]).not.toBe(header);
        expect(appliedSorts[0].uniqueId).toBe(header.uniqueId);
        expect(appliedSorts[0].sortDirection).toBe('asc');
    });

    it('should apply and persist sorting only after edit mode is confirmed', () => {
        const preferences = TestBed.inject(UserPreferenceService);
        const setHeadersAndSortsSpy = spyOn(preferences, 'setHeadersAndSorts').and.callThrough();
        const header = service.headerState.selectedHeaders[0];
        const appliedSortsHistory: Array<Array<HeaderColumn>> = [];
        service.appliedSorts$.subscribe(sorts => appliedSortsHistory.push(sorts));
        const initialEmissionCount = appliedSortsHistory.length;

        service.changeMode(HeaderMode.EDIT);
        header.sortDirection = 'desc';
        service.sortingColumnSelected(header);

        expect(appliedSortsHistory.length).toBe(initialEmissionCount);
        expect(setHeadersAndSortsSpy).not.toHaveBeenCalled();

        service.confirmEditMode();

        expect(appliedSortsHistory.length).toBe(initialEmissionCount + 1);
        expect(appliedSortsHistory[appliedSortsHistory.length - 1][0].sortDirection).toBe('desc');
        expect(setHeadersAndSortsSpy).toHaveBeenCalledWith('case-view', jasmine.any(Array), [{
            headerUniqueId: header.uniqueId,
            sortDirection: 'desc'
        }]);
        expect(preferences.getSorts('case-view')).toEqual([{
            headerUniqueId: header.uniqueId,
            sortDirection: 'desc'
        }]);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
