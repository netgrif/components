import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTaskViewComponent } from './public-task-view.component';

describe('PublicTaskViewComponent', () => {
  let component: PublicTaskViewComponent;
  let fixture: ComponentFixture<PublicTaskViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTaskViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
