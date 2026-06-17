import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModeComponent } from './task-mode.component';

describe('TaskModeComponent', () => {
  let component: TaskModeComponent;
  let fixture: ComponentFixture<TaskModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
