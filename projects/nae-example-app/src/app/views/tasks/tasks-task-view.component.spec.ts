import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksTaskViewComponent } from './tasks-task-view.component';

describe('TasksTaskViewComponent', () => {
  let component: TasksTaskViewComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksTaskViewComponent ]
    })
    .compileComponents();

     fixture = TestBed.createComponent(TestWrapperComponent);
     component = fixture.debugElement.children[0].componentInstance;
     fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


nae-app-tasks-task-view
