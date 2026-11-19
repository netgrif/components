import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskListComponent} from './task-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {CommonModule} from '@angular/common';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {
    AssignPolicy,
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    DataFocusPolicy,
    FinishPolicy,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    SearchService,
    TaskResourceService,
    TaskViewService,
    TestConfigurationService,
    UserResourceService,
    NAE_BASE_FILTER, TestTaskBaseFilterProvider, AllowedNetsService, TestTaskViewAllowedNetsFactory, AllowedNetsServiceFactory
} from '@netgrif/components-core';
import {RouterTestingModule} from '@angular/router/testing';
import {PanelComponentModule} from '../panel.module';
import {AuthenticationComponentModule} from '../../authentication/auth.module';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [
                MatExpansionModule,
                PanelComponentModule,
                MaterialModule,
                CommonModule,
                AuthenticationComponentModule,
                RouterTestingModule.withRoutes([])
            ],
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
                {
                    provide: ConfigurationService,
                    useClass: TestConfigurationService
                },
                {provide: TaskResourceService, useClass: MyResources},
                {provide: AllowedNetsService, useFactory: TestTaskViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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
    selector: 'nc-test-wrapper',
    template: '<nc-task-list [tasks$]="taskPanels"></nc-task-list>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
