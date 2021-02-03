import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedTaskViewComponent } from './tabbed-task-view.component';

describe('TaskViewComponent', () => {
  let component: TabbedTaskViewComponent;
  let fixture: ComponentFixture<TabbedTaskViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabbedTaskViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
