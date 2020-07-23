import {TestBed} from '@angular/core/testing';
import {CaseHeaderService} from './case-header.service';
import {HeaderType} from '../models/header-type';
import {HeaderMode} from '../models/header-mode';
import {SearchChangeDescription} from '../models/user-changes/search-change-description';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';
import {SearchService} from '../../search/search-service/search.service';
import {TestCaseSearchServiceFactory, TestCaseViewFactory} from '../../utility/tests/test-factory-methods';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MatIconModule, MatSnackBarModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {ConfigCaseViewServiceFactory} from '../../view/case-view/service/factory/config-case-view-service-factory';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ViewService} from '../../routing/view-service/view.service';
import {TestViewService} from '../../utility/tests/test-view-service';
import {RouterModule} from '@angular/router';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {CaseMetaField} from './case-menta-enum';
import {HeaderChangeType} from '../models/user-changes/header-change-type';

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
                RouterModule.forRoot([])
            ],
            providers: [
                CaseHeaderService,
                ConfigCaseViewServiceFactory,
                AuthenticationMethodService,
                {
                    provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory
                },
                {
                    provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [ConfigCaseViewServiceFactory]
                },
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
            ],
            declarations: [
                ErrorSnackBarComponent,
                SuccessSnackBarComponent
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

    it('call sort header changed', () => {
        service.headerChange$.subscribe(res => {
            expect(res).toEqual({headerType: HeaderType.CASE, changeType: HeaderChangeType.SORT, description: undefined});
        });
        service.sortHeaderChanged(0, '', 'asc');
    });

    it('call search input changed', () => {
        service.headerChange$.subscribe(res => {
            expect(res).toEqual({
                headerType: HeaderType.CASE, changeType: HeaderChangeType.SEARCH, description:
                    {
                        fieldIdentifier: 'visualId', searchInput: 'hladaj', type: 'meta',
                        petriNetIdentifier: undefined
                    } as SearchChangeDescription
            });
        });
        service.headerSearchInputChanged(0, 'hladaj');
    });

    it('call column selected', () => {
        service.headerChange$.subscribe(res => {
            expect(res.headerType).toEqual(HeaderType.CASE);
            expect(res.changeType).toEqual(HeaderChangeType.EDIT);
        });
        service.headerColumnSelected(0, new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'Title', 'text'));

        service.headerChange$.subscribe(res => {
            expect(res.headerType).toEqual(HeaderType.CASE);
            expect(res.changeType).toEqual(HeaderChangeType.EDIT);
        });
        service.revertEditMode();
    });

    it('call search input changed', () => {
        service.headerChange$.subscribe(res => {
            expect(res).toEqual({
                headerType: HeaderType.CASE, changeType: HeaderChangeType.SEARCH,
                description: {
                    fieldIdentifier: 'visualId', searchInput: 'hladaj', type: 'meta',
                    petriNetIdentifier: undefined
                } as SearchChangeDescription
            });
        });
        service.headerSearchInputChanged(0, 'hladaj');
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
