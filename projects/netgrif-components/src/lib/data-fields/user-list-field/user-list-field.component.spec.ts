import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListFieldComponent } from './user-list-field.component';

describe('UserListFieldComponent', () => {
  let component: UserListFieldComponent;
  let fixture: ComponentFixture<UserListFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
