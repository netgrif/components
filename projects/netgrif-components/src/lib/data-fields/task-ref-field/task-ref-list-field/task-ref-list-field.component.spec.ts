import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRefListFieldComponent } from './task-ref-list-field.component';

describe('TaskRefListFieldComponent', () => {
  let component: TaskRefListFieldComponent;
  let fixture: ComponentFixture<TaskRefListFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskRefListFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRefListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
