import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBarChartTextFieldComponent } from './dashboard-bar-chart-text-field.component';

describe('DashboardBarChartTextFieldComponent', () => {
  let component: DashboardBarChartTextFieldComponent;
  let fixture: ComponentFixture<DashboardBarChartTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBarChartTextFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBarChartTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
