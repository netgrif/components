import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsPanelComponent } from './workflows-panel.component';

describe('WorkflowsPanelComponent', () => {
  let component: WorkflowsPanelComponent;
  let fixture: ComponentFixture<WorkflowsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
