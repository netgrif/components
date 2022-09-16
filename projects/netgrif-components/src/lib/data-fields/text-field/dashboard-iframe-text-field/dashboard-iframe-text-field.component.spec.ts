import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIframeTextFieldComponent } from './dashboard-iframe-text-field.component';

describe('DashboardIframeTextFieldComponent', () => {
  let component: DashboardIframeTextFieldComponent;
  let fixture: ComponentFixture<DashboardIframeTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardIframeTextFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardIframeTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
