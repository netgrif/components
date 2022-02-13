import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {CommonModule} from '@angular/common';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskPanelComponent} from './task-panel.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {
    AssignPolicy,
    AssignPolicyService,
    AssignTaskService,
    AuthenticationMethodService,
    AuthenticationService,
    CancelTaskService,
    ChangedFields,
    ConfigurationService,
    createMockTask,
    DataFocusPolicy,
    DataFocusPolicyService,
    DelegateTaskService,
    ErrorSnackBarComponent,
    FinishPolicy,
    FinishPolicyService,
    FinishTaskService,
    HeaderColumn,
    HeaderColumnType,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    NAE_TASK_OPERATIONS,
    SearchService,
    SideMenuService,
    SingleTaskContentService,
    SnackBarModule,
    SubjectTaskOperations,
    SuccessSnackBarComponent,
    TaskContentService,
    TaskDataService,
    TaskEventService,
    TaskMetaField,
    TaskPanelData,
    TaskRequestStateService,
    TaskResourceService,
    TaskViewService,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
    NAE_BASE_FILTER,
    TestTaskBaseFilterProvider,
    AllowedNetsService,
    TestTaskViewAllowedNetsFactory,
    AllowedNetsServiceFactory,
    CurrencyModule, ChangedFieldsService
} from '@netgrif/components-core';
import {of, Subject, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {PanelComponent} from '../panel.component';
import {TaskContentComponent} from '../../task-content/task-content/task-content.component';
import {TaskContentComponentModule} from '../../task-content/task-content.module';

describe('TaskPanelComponent', () => {
    let component: TaskPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        const mockAssignPolicyService = {
            performAssignPolicy: () => {
            }
        };

        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                TranslateLibModule,
                HttpClientTestingModule,
                SnackBarModule,
                TaskContentComponentModule,
                CurrencyModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                TaskViewService,
                SideMenuService,
                ChangedFieldsService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: TaskResourceService, useClass: MyTaskResources},
                {provide: UserResourceService, useClass: MockUserResourceService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestTaskBaseFilterProvider
                },
                {provide: TaskContentService, useClass: SingleTaskContentService},
                TaskDataService,
                TaskEventService,
                AssignTaskService,
                DelegateTaskService,
                CancelTaskService,
                FinishTaskService,
                TaskRequestStateService,
                DataFocusPolicyService,
                AssignPolicyService,
                FinishPolicyService,
                {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
                {provide: AllowedNetsService, useFactory: TestTaskViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: [
                PanelComponent,
                TaskPanelComponent,
                TestWrapperComponent,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent,
                    TaskContentComponent
                ]
            }
        }).overrideProvider(AssignPolicyService, {useValue: mockAssignPolicyService}
        ).compileComponents();

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
    template: '<nc-task-panel [taskPanelData]="taskPanel" [selectedHeaders$]="selectedHeaders$"></nc-task-panel>'
})
class TestWrapperComponent {
    taskPanel: TaskPanelData = {
        task: createMockTask(),
        changedFields: new Subject<ChangedFields>(),
        initiallyExpanded: false
    };
    selectedHeaders$ = of([
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.TITLE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.PRIORITY, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.USER, 'string', 'string'),
    ]);
}

class MyTaskResources {

    getData(stringId) {
        return of([{
            fields: {
                _embedded: {
                    localisedNumberFields: [{
                        stringId: 'number',
                        type: 'number',
                        name: 'Number',
                        description: 'Number field description',
                        placeholder: 'Number field placeholder',
                        behavior: {
                            editable: true
                        },
                        value: 10.0,
                        order: 0,
                        validations: [{
                            validationRule: 'inrange 0,inf'
                        }, {
                            validationRule: 'inrange 0,inf',
                            validationMessage: 'Number field validation message'
                        }],
                        defaultValue: 10.0,
                        layout: {
                            x: 1,
                            y: 1,
                            cols: 1,
                            rows: 1
                        }
                    }]
                }
            },
            alignment: 'start',
            stretch: true,
            layout: {
                row: 2,
                cols: 2
            }
        }]);
    }

    setData(stringId) {
        return of({changedFields: {}});
    }

    assignTask(stringId) {
        if (stringId === 'true') {
            return of({success: 'Success'});
        } else if (stringId === 'false') {
            return of({error: 'error'});
        } else if (stringId === 'error') {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }

    finishTask(stringId) {
        if (stringId === 'true') {
            return of({success: 'Success'});
        } else if (stringId === 'false') {
            return of({error: 'error'});
        } else if (stringId === 'error') {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }

    searchTask(filter) {
        return of([{
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {},
            users: {},
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            layout: {
                cols: undefined,
                rows: undefined
            },
            dataGroups: [],
            _links: {}
        }]);
    }
}

