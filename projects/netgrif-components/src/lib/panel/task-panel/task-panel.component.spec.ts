import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {CommonModule} from '@angular/common';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskPanelComponent} from './task-panel.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {
    MaterialModule,
    TranslateLibModule,
    UserResourceService,
    ConfigurationService,
    TestConfigurationService,
    ArrayTaskViewServiceFactory,
    SideMenuService,
    TaskViewService,
    noNetsTaskViewServiceFactory,
    TaskResourceService,
    SearchService,
    TestTaskSearchServiceFactory,
    AssignPolicyService,
    ErrorSnackBarComponent,
    SuccessSnackBarComponent,
    TaskPanelData,
    AssignPolicy,
    DataFocusPolicy,
    FinishPolicy,
    ChangedFields,
    HeaderColumn,
    HeaderColumnType,
    TaskMetaField,
    AuthenticationService,
    PanelModule,
    MockAuthenticationService,
    AuthenticationMethodService,
    MockAuthenticationMethodService,
    MockUserResourceService,
    TaskContentService,
    SingleTaskContentService,
    TaskDataService,
    TaskEventService,
    AssignTaskService,
    DelegateTaskService,
    CancelTaskService,
    FinishTaskService,
    DataFocusPolicyService,
    TaskRequestStateService,
    FinishPolicyService,
    NAE_TASK_OPERATIONS,
    SubjectTaskOperations
} from '@netgrif/application-engine';
import {PanelComponentModule} from '../panel.module';
import {of, Subject, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

describe('AbstractTaskPanelComponent', () => {
    let component: TaskPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let assignSpy: jasmine.Spy;

    beforeEach(async(() => {
        const mockAssignPolicyService = {
            performAssignPolicy: () => {}
        };

        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                PanelModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                TranslateLibModule,
                HttpClientTestingModule,
                PanelComponentModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                ArrayTaskViewServiceFactory,
                SideMenuService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {
                    provide: TaskViewService,
                    useFactory: noNetsTaskViewServiceFactory,
                    deps: [ArrayTaskViewServiceFactory]
                },
                {provide: TaskResourceService, useClass: MyTaskResources},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: SearchService, useFactory: TestTaskSearchServiceFactory},
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
            ],
            declarations: [
                TestWrapperComponent,
                TaskPanelComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        }).overrideProvider(AssignPolicyService, {useValue: mockAssignPolicyService}
        ).compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        assignSpy = spyOn<any>(mockAssignPolicyService, 'performAssignPolicy');
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should perform assign policy on panel open', () => {
        component.panelRef.open();
        expect(assignSpy).toHaveBeenCalled();
    });

    it('should process tasks', () => {
        component.taskPanelData.task.stringId = 'true';
        component.taskPanelData.task.startDate = [2020, 1, 1, 1, 1];
        component.assign();
        expect(component.taskPanelData.task.startDate).toBe(undefined);

        component.taskPanelData.task.stringId = 'true';
        component.taskPanelData.task.startDate = [2020, 1, 1, 1, 1];
        component.finish();
        expect(component.taskPanelData.task.startDate).toBe(undefined);
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-task-panel [taskPanelData]="taskPanel" [selectedHeaders$]="selectedHeaders$"></nc-task-panel>'
})
class TestWrapperComponent {
    taskPanel: TaskPanelData = {
        task: {
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
            layout: {
                offset: 0,
                cols: undefined,
                rows: undefined
            },
            dataGroups: [],
            _links: {}
        },
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

