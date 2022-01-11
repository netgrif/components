import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExampleComponent } from './dashboard-example.component';

describe('DashboardExampleComponent', () => {
  let component: DashboardExampleComponent;
  let fixture: ComponentFixture<DashboardExampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
