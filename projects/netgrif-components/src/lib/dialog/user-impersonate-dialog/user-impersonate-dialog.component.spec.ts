import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImpersonateDialogComponent } from './user-impersonate-dialog.component';

describe('UserImpersonateDialogComponent', () => {
  let component: UserImpersonateDialogComponent;
  let fixture: ComponentFixture<UserImpersonateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserImpersonateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImpersonateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
