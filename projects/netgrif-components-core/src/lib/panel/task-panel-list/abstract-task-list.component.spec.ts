import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, Inject, Optional} from '@angular/core';
import {of} from 'rxjs';
import {AbstractTaskListComponent} from './abstract-task-list.component';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {MaterialModule} from '../../material/material.module';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {SearchService} from '../../search/search-service/search.service';
import {TestTaskBaseFilterProvider, TestTaskViewAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../tabs/interfaces';
import {NAE_BASE_FILTER} from '../../search/models/base-filter-injection-token';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {ActivatedRoute} from '@angular/router';


describe('AbstractTaskListComponent', () => {
    let component: TestTaskListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                HttpClientTestingModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            declarations: [TestTaskListComponent, TestWrapperComponent],
            providers: [
                TaskViewService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestTaskBaseFilterProvider
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: TaskResourceService, useClass: MyResources},
                {provide: AllowedNetsService, useFactory: TestTaskViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-task-list',
    template: ''
})
class TestTaskListComponent extends AbstractTaskListComponent {
    constructor(protected _taskViewService: TaskViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected _route: ActivatedRoute) {
        super(_taskViewService, _log, injectedTabData, _route);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-task-list [tasks$]="taskPanels"></ncc-test-task-list>'
})
class TestWrapperComponent {
    taskPanels = of([]);
}

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
