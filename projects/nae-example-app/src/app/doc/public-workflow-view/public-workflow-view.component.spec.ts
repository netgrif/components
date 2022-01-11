import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWorkflowViewComponent } from './public-workflow-view.component';

describe('PublicWorkflowViewComponent', () => {
  let component: PublicWorkflowViewComponent;
  let fixture: ComponentFixture<PublicWorkflowViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicWorkflowViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicWorkflowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
