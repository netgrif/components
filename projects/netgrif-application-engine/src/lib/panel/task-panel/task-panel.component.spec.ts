import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPanelComponent } from './task-panel.component';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PanelComponent} from '../panel.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {TaskPanelContentComponent} from './task-panel-content/task-panel-content.component';
import {DataFieldsModule} from '../../data-fields/data-fields.module';

describe('TaskPanelComponent', () => {
  let component: TaskPanelComponent;
  let fixture: ComponentFixture<TaskPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            MaterialModule,
            CommonModule,
            FlexModule,
            BrowserAnimationsModule,
            TaskPanelTestModule,
            DataFieldsModule
        ],
        declarations: [PanelComponent, TaskPanelComponent],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@NgModule({
    imports: [DataFieldsModule],
    declarations: [TaskPanelContentComponent],
    entryComponents: [TaskPanelContentComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
class TaskPanelTestModule { }
