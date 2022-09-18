import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImpersonateComponent } from './user-impersonate.component';

describe('UserImpersonateComponent', () => {
  let component: UserImpersonateComponent;
  let fixture: ComponentFixture<UserImpersonateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserImpersonateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImpersonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
