import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPortalTextFieldComponent } from './dashboard-portal-text-field.component';

describe('DashboardPortalTextFieldComponent', () => {
  let component: DashboardPortalTextFieldComponent;
  let fixture: ComponentFixture<DashboardPortalTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPortalTextFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPortalTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
