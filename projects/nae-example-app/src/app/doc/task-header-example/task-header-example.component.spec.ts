import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHeaderExampleComponent } from './task-header-example.component';

describe('TaskHeaderExampleComponent', () => {
  let component: TaskHeaderExampleComponent;
  let fixture: ComponentFixture<TaskHeaderExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskHeaderExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskHeaderExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
