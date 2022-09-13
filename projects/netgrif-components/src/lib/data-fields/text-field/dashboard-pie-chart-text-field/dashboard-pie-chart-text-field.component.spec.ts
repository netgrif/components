import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPieChartTextFieldComponent } from './dashboard-pie-chart-text-field.component';

describe('DashboardPieChartTextFieldComponent', () => {
  let component: DashboardPieChartTextFieldComponent;
  let fixture: ComponentFixture<DashboardPieChartTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPieChartTextFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPieChartTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
