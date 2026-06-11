import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskRefInitFieldComponent} from './task-ref-init-field.component';

describe('TaskRefInitFieldComponent', () => {
  let component: TaskRefInitFieldComponent;
  let fixture: ComponentFixture<TaskRefInitFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskRefInitFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskRefInitFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
