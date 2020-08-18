import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {PanelModule} from '../panel.module';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskPanelComponent} from './task-panel.component';
import {TaskPanelData} from '../task-panel-list/task-panel-data/task-panel-data';
import {Observable, of, Subject, throwError} from 'rxjs';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {ConfigurationService} from '../../configuration/configuration.service';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {map} from 'rxjs/operators';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {User} from '../../resources/interface/user';
import {SearchService} from '../../search/search-service/search.service';
import {TestTaskSearchServiceFactory} from '../../utility/tests/test-factory-methods';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    ArrayTaskViewServiceFactory,
    noNetsTaskViewServiceFactory
} from '../../view/task-view/service/factory/array-task-view-service-factory';
import {TaskMetaField} from '../../header/task-header/task-meta-enum';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {AssignPolicyService} from '../../task/services/assign-policy.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('TaskPanelComponent', () => {
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
                AuthenticationModule,
                TranslateLibModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                ArrayTaskViewServiceFactory,
                SideMenuService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {
                    provide: TaskViewService,
                    useFactory: noNetsTaskViewServiceFactory,
                    deps: [ArrayTaskViewServiceFactory]
                },
                {provide: TaskResourceService, useClass: MyResources},
                {provide: UserResourceService, useClass: MyUserResources},
                {provide: SearchService, useFactory: TestTaskSearchServiceFactory},
            ],
            declarations: [
                TestWrapperComponent,
            ]
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
    selector: 'nae-test-wrapper',
    template: '<nae-task-panel [taskPanelData]="taskPanel" [selectedHeaders$]="selectedHeaders$"></nae-task-panel>'
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

class MyResources {

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

class MyUserResources {
    getLoggedUser(params): Observable<User> {
        return of({
            id: '5',
            email: 'string',
            name: 'string',
            surname: 'string',
            fullName: 'string',
            groups: [],
            authorities: [],
            processRoles: [],
            _links: {},
        });
    }
}

