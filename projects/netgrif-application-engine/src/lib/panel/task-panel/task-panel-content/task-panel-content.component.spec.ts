import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPanelContentComponent } from './task-panel-content.component';

describe('TaskPanelContentComponent', () => {
  let component: TaskPanelContentComponent;
  let fixture: ComponentFixture<TaskPanelContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPanelContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPanelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
