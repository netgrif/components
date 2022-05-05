import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListPaginationComponent } from './task-list-pagination.component';

describe('TaskPanelListPaginationComponent', () => {
  let component: TaskListPaginationComponent;
  let fixture: ComponentFixture<TaskListPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
