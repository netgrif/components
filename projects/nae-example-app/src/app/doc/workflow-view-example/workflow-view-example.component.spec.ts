import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowViewExampleComponent } from './workflow-view-example.component';

describe('WorkflowsViewExampleComponent', () => {
  let component: WorkflowViewExampleComponent;
  let fixture: ComponentFixture<WorkflowViewExampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowViewExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowViewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
