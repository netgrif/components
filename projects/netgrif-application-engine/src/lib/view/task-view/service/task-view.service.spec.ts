import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {TaskViewService} from './task-view.service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {of} from 'rxjs';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../../task-content/model/policy';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {SearchService} from '../../../search/search-service/search.service';
import {TestTaskSearchServiceFactory} from '../../../utility/tests/test-factory-methods';
import {ArrayTaskViewServiceFactory, noNetsTaskViewServiceFactory} from './factory/array-task-view-service-factory';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {ErrorSnackBarComponent} from '../../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {WarningSnackBarComponent} from '../../../snack-bar/components/warning-snack-bar/warning-snack-bar.component';

describe('TaskViewService', () => {
    let service: TaskViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule,
                NoopAnimationsModule],
            providers: [
                ArrayTaskViewServiceFactory,
                {
                    provide: TaskViewService,
                    useFactory: noNetsTaskViewServiceFactory,
                    deps: [ArrayTaskViewServiceFactory]
                },
                {provide: TaskResourceService, useClass: MyResources},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: SearchService, useFactory: TestTaskSearchServiceFactory},
                AuthenticationMethodService
            ],
            declarations: [
                ErrorSnackBarComponent,
                SuccessSnackBarComponent,
                WarningSnackBarComponent
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent,
                    WarningSnackBarComponent
                ]
            }
        });
        service = TestBed.inject(TaskViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

class MyResources {
    searchTask(filter) {
        return of([{
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {},
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            cols: undefined,
            dataGroups: [],
            _links: {}
        }]);
    }
}
