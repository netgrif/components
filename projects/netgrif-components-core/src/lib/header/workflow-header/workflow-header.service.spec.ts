import {TestBed} from '@angular/core/testing';
import {WorkflowHeaderService} from './workflow-header.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ViewService} from '../../routing/view-service/view.service';
import {TestViewService} from '../../utility/tests/test-view-service';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {ViewIdService} from '../../user/services/view-id.service';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {WorkflowMetaField} from './workflow-meta-enum';
import {HeaderSortingMode} from '../models/header-sorting-mode';

describe('WorkflowHeaderService', () => {
    let service: WorkflowHeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateLibModule,
                HttpClientTestingModule,
                MatSnackBarModule,
                MatIconModule,
                RouterTestingModule.withRoutes([]),
                NoopAnimationsModule,
                SnackBarModule
            ],
            providers: [
                WorkflowHeaderService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                {provide: ViewIdService, useValue: {viewId: 'workflow-view'}},
            ]
        });
        TestBed.inject(UserPreferenceService).setSorts('workflow-view', [
            {
                headerUniqueId: `meta-${WorkflowMetaField.TITLE}`,
                sortDirection: 'asc'
            },
            {
                headerUniqueId: `meta-${WorkflowMetaField.VERSION}`,
                sortDirection: 'desc'
            }
        ]);
        service = TestBed.inject(WorkflowHeaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load preferred sorts during initialization', () => {
        expect(service.sortingMode).toBe(HeaderSortingMode.SINGLE);
        expect(service.headerState.selectedSorts.length).toBe(1);
        expect(service.headerState.selectedSorts[0].fieldIdentifier).toBe(WorkflowMetaField.TITLE);
        expect(service.headerState.selectedSorts[0].sortDirection).toBe('asc');
    });

    it('should replace the active sort in single sorting mode', () => {
        const previousHeader = service.headerState.selectedSorts[0];
        const newHeader = service.fieldsGroup[0].fields.find(header => header.fieldIdentifier === WorkflowMetaField.VERSION);
        newHeader.sortDirection = 'desc';

        service.sortingColumnSelected(newHeader);

        expect(previousHeader.sortDirection).toBe('');
        expect(service.headerState.selectedSorts).toEqual([newHeader]);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
