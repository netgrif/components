import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedCaseViewComponent } from './tabbed-case-view.component';

describe('CaseViewComponent', () => {
  let component: TabbedCaseViewComponent;
  let fixture: ComponentFixture<TabbedCaseViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabbedCaseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedCaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
