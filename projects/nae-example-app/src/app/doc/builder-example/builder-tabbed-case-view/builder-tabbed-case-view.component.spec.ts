import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderTabbedCaseViewComponent } from './builder-tabbed-case-view.component';

describe('CaseViewComponent', () => {
  let component: BuilderTabbedCaseViewComponent;
  let fixture: ComponentFixture<BuilderTabbedCaseViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderTabbedCaseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderTabbedCaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
