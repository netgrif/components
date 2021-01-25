import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWorkflowPanelComponent } from './public-workflow-panel.component';

describe('PublicWorkflowPanelComponent', () => {
  let component: PublicWorkflowPanelComponent;
  let fixture: ComponentFixture<PublicWorkflowPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicWorkflowPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicWorkflowPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
