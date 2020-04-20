import {NAE_TASK_COLS, TaskPanelContentComponent} from './task-panel-content.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskViewService} from '../../../view/task-view/task-view.service';
import {MatExpansionModule} from '@angular/material';
import {PanelModule} from '../../panel.module';
import {MaterialModule} from '../../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {TaskPanelContentService} from './task-panel-content.service';

describe('TaskPanelContentComponent', () => {
    let component: TaskPanelContentComponent;
    let fixture: ComponentFixture<TaskPanelContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                PanelModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule
            ],
            providers: [
                TaskViewService,
                TaskPanelContentService,
                {provide: NAE_TASK_COLS, useValue: 4},
            ],
            declarations: []
        })
            .compileComponents();

        fixture = TestBed.createComponent(TaskPanelContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
