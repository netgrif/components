import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsPanelGroupComponent } from './workflows-panel-group.component';

describe('WorkflowsPanelGroupComponent', () => {
  let component: WorkflowsPanelGroupComponent;
  let fixture: ComponentFixture<WorkflowsPanelGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowsPanelGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsPanelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
