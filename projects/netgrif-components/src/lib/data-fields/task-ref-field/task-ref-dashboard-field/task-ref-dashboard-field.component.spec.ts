import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRefDashboardFieldComponent } from './task-ref-dashboard-field.component';

describe('TaskRefDashboardFieldComponent', () => {
  let component: TaskRefDashboardFieldComponent;
  let fixture: ComponentFixture<TaskRefDashboardFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskRefDashboardFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRefDashboardFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
