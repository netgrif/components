import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatExpansionModule} from '@angular/material/expansion';
import {PanelModule} from '../panel.module';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskPanelComponent} from './task-panel.component';
import {TaskPanelData} from '../task-panel-list/task-panel-data/task-panel-data';
import {of, Subject} from 'rxjs';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from './policy';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {ConfigurationService} from '../../configuration/configuration.service';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {TaskViewService} from '../../view/task-view/task-view.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TaskMetaField} from '../../header/task-header/task-header.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';

describe('TaskPanelComponent', () => {
    let component: TaskPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

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
                {provide: TaskResourceService, useClass: MyResources}
            ],
            declarations: [TestWrapperComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call show function', () => {
        expect(component.show(new MouseEvent('type'))).toBeFalse();
    });

    it('should call getTaskDataFields and updateTaskDataFields functions', () => {
        component.getTaskDataFields();
        component.updateTaskDataFields();
        expect(component.taskPanelData.task.dataGroups.length).toEqual(1);
    });

    it('should process assign', () => {
        component.processTask('assign');
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
        return of({success: 'Success'});
    }

    searchTask() {
        return of({
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
        });
    }
}


