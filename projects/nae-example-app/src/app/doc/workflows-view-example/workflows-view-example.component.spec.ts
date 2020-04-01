import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsViewExampleComponent } from './workflows-view-example.component';

describe('WorkflowsViewExampleComponent', () => {
  let component: WorkflowsViewExampleComponent;
  let fixture: ComponentFixture<WorkflowsViewExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowsViewExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsViewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
