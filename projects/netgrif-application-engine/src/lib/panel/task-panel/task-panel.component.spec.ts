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
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from './policy';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {ConfigurationService} from '../../configuration/configuration.service';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {TaskViewService} from '../../view/task-view/task-view.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TaskMetaField} from '../../header/task-header/task-header.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {map} from 'rxjs/operators';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource-service';
import {User} from '../../resources/interface/user';

describe('TaskPanelComponent', () => {
    let component: TaskPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let autoDataSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                PanelModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                AuthenticationModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                TaskViewService,
                {provide: TaskResourceService, useClass: MyResources},
                {provide: UserResourceService, useClass: MyUserResources},
                SideMenuService
            ],
            declarations: [TestWrapperComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        autoDataSpy = spyOn<any>(component, 'autoRequiredDataFocusPolicy');
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call show function', () => {
        expect(component.show(new MouseEvent('type'))).toBeFalse();
    });

    it('should test getTaskDataFields, updateTaskDataFields and updateFromChangedFields functions', () => {
        component.getTaskDataFields();
        component.updateTaskDataFields();
        expect(component.taskPanelData.task.dataGroups.length).toEqual(1);

        component.taskPanelData.changedFields.next({number: { value: 10, behavior: {string: {editable: true}}}});
        expect(component.taskPanelData.task.dataGroups[0].fields[0].value).toEqual(10);
        expect(component.taskPanelData.task.dataGroups[0].fields[0].behavior).toEqual({editable: true});
    });

    it('should open and close panel, test policies', () => {
        component.taskPanelData.task.stringId = 'true';

        component.taskPanelData.task.finishPolicy = FinishPolicy.autoNoData;
        component.taskPanelData.task.dataFocusPolicy = DataFocusPolicy.autoRequired;
        component.taskPanelData.task.assignPolicy = AssignPolicy.auto;
        component.panelRef.open();
        component.panelRef.close();

        component.taskPanelData.task.assignPolicy = AssignPolicy.manual;
        component.panelRef.open();
        component.panelRef.close();

        component.taskPanelData.task.dataFocusPolicy = DataFocusPolicy.manual;
        component.taskPanelData.task.finishPolicy = FinishPolicy.manual;
        component.panelRef.open();
        component.panelRef.close();
        expect(autoDataSpy).toHaveBeenCalled();
    });

    it('should process tasks', () => {
        component.taskPanelData.task.stringId = 'true';
        component.taskPanelData.task.startDate = [2020, 1, 1, 1, 1];
        component.processTask('assign');
        expect(component.taskPanelData.task.startDate).toBe(undefined);

        component.taskPanelData.task.stringId = 'true';
        component.loading = true;
        component.processTask('assign');
        component.loading = false;

        component.taskPanelData.task.user = {
            email: 'string',
            name: 'string',
            surname: 'string',
            state: 'string',
            authorities: [],
            userProcessRoles: [],
            processRoles: [],
            groups: [],
            fullName: 'string',
            registered: true
        };
        component.processTask('assign');
        component.taskPanelData.task.user = undefined;

        component.loading = true;
        component.processTask('delegate');
        component.loading = false;

        component.loading = true;
        component.processTask('cancel');
        component.loading = false;

        component.processTask('cancel');

        component.taskPanelData.task.stringId = 'true';
        component.taskPanelData.task.startDate = [2020, 1, 1, 1, 1];
        component.processTask('finish');
        expect(component.taskPanelData.task.startDate).toBe(undefined);
    });

    it('should test assign', async () => {
        component.taskPanelData.task.stringId = 'true';
        component.taskPanelData.task.startDate = [2020, 1, 1, 1, 1];
        const afterTrue = new Subject<boolean>();
        afterTrue.subscribe( res => {
            expect(res).toBeTrue();
            expect(component.taskPanelData.task.startDate).toBe(undefined);
        });
        await component.assign(afterTrue);

        component.taskPanelData.task.stringId = 'false';
        const afterFalse = new Subject<boolean>();
        afterFalse.subscribe( res => expect(res).toBeFalse());
        await component.assign(afterFalse);

        component.taskPanelData.task.stringId = 'error';
        const afterErr = new Subject<boolean>();
        afterErr.subscribe( res => expect(res).toBeFalse());
        await component.assign(afterErr);
    });

    it('should test finish', async () => {
        component.taskPanelData.task.stringId = 'true';
        const afterTrue = new Subject<boolean>();
        afterTrue.subscribe( res => {
            expect(res).toBeTrue();
        });
        await component.finish(afterTrue);

        component.taskPanelData.task.stringId = 'false';
        const afterFalse = new Subject<boolean>();
        afterFalse.subscribe( res => expect(res).toBeFalse());
        await component.finish(afterFalse);

        component.taskPanelData.task.stringId = 'error';
        component.taskPanelData.task.dataSize = 0;
        const afterErr = new Subject<boolean>();
        afterErr.subscribe( res => expect(res).toBeFalse());
        await component.finish(afterErr);
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
            cols: undefined,
            dataGroups: [],
            _links: {}
        },
        changedFields: new Subject<ChangedFields>()
    };
    selectedHeaders$ = of([
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.TITLE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.PRIORITY, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.USER, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'string', 'string', 'string', 'string'),
    ]);
}

class MyResources {

    getData(stringId) {
        return of([{
            fields : {
                _embedded : {
                    localisedNumberFields : [ {
                        stringId : 'number',
                        type : 'number',
                        name : 'Number',
                        description : 'Number field description',
                        placeholder : 'Number field placeholder',
                        behavior : {
                            editable : true
                        },
                        value : 10.0,
                        order : 0,
                        validations : [ {
                            validationRule : 'inrange 0,inf'
                        }, {
                            validationRule : 'inrange 0,inf',
                            validationMessage : 'Number field validation message'
                        } ],
                        defaultValue : 10.0
                    } ]
                }
            },
            alignment : 'start',
            stretch : true
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
            return of({error: 'error'}).pipe(map( res => { throw throwError(res); }));
        }
    }

    finishTask(stringId) {
        if (stringId === 'true') {
            return of({success: 'Success'});
        } else if (stringId === 'false') {
            return of({error: 'error'});
        } else if (stringId === 'error') {
            return of({error: 'error'}).pipe(map( res => { throw throwError(res); }));
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
            cols: undefined,
            dataGroups: [],
            _links: {}
        }]);
    }
}

class MyUserResources {
    getLoggedUser(params): Observable<User> {
        return of({
            id: 5,
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

