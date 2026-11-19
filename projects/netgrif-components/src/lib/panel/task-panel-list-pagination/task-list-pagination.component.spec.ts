import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TaskListPaginationComponent} from './task-list-pagination.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {PanelComponentModule} from '../panel.module';
import {
    AllowedNetsService, AllowedNetsServiceFactory, AssignPolicy,
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService, DataFocusPolicy, FinishPolicy,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    NAE_BASE_FILTER,
    SearchService,
    TaskResourceService,
    TaskViewService,
    TestConfigurationService,
    TestTaskBaseFilterProvider, TestTaskViewAllowedNetsFactory,
    UserResourceService
} from '@netgrif/components-core';
import {CommonModule} from '@angular/common';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {AuthenticationComponentModule} from '../../authentication/auth.module';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {of} from 'rxjs';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TaskListPaginationComponent', () => {
    let component: TaskListPaginationComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
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
    template: '<nc-task-list-pagination [tasks$]="taskPanels"></nc-task-list-pagination>',
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
