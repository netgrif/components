import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskListComponent} from './task-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {PanelModule} from '../panel/panel.module';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MaterialModule} from '../material/material.module';
import {TaskPanelComponent} from '../panel/task-panel/task-panel.component';
import {Resources} from '../panel/task-panel/task-panel-content/resources';

describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                PanelModule,
                MaterialModule,
                CommonModule
            ],
            declarations: [TaskListComponent, TaskPanelComponent, TestWrapperComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-task-panel' +
        ' *ngFor="let taskPanel of taskPanels" ' +
        '[taskPanelDefinition]="taskPanel.header"' +
        ' [resources]="taskPanel.resource">' +
        '</nae-task-panel>'
})
class TestWrapperComponent {
    taskPanels = [{
            header: {
                featuredFields: ['T1', 'T2', 'T3', 'T4'],
                panelIcon: 'home',
                panelIconField: 'home',
            },
            resource: {
                cols: 4,
                data: Resources.data
            }
        }];
}
