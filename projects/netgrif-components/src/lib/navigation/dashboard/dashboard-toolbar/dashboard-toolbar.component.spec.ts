import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardToolbarComponent } from './dashboard-toolbar.component';

describe('DashboardComponent', () => {
  let component: DashboardToolbarComponent;
  let fixture: ComponentFixture<DashboardToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
