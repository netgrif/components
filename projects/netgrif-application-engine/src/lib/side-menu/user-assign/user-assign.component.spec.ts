import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignComponent } from './user-assign.component';

describe('UserAssignComponent', () => {
  let component: UserAssignComponent;
  let fixture: ComponentFixture<UserAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
