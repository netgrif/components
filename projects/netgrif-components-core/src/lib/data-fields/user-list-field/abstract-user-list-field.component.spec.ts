import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractUserListFieldComponent } from './abstract-user-list-field.component';

describe('AbstractUserlListFieldComponent', () => {
  let component: AbstractUserListFieldComponent;
  let fixture: ComponentFixture<AbstractUserListFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractUserListFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractUserListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
