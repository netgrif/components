import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPanelComponent } from './task-panel.component';

describe('TaskPanelComponent', () => {
  let component: TaskPanelComponent;
  let fixture: ComponentFixture<TaskPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPanelComponent ]
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
