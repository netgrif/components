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
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        });
        service = TestBed.inject(CaseHeaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('get header type = case', () => {
        expect(service.headerType).toEqual(HeaderType.CASE);
    });

    it('set allowed nets', () => {
        service.setAllowedNets([{
            stringId: 'string',
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
