import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImpersonateDialogComponent } from './admin-impersonate-dialog.component';

describe('AdminImpersonateDialogComponent', () => {
  let component: AdminImpersonateDialogComponent;
  let fixture: ComponentFixture<AdminImpersonateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminImpersonateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImpersonateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
