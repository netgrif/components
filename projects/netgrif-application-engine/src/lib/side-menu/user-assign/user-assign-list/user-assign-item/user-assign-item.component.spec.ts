import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignItemComponent } from './user-assign-item.component';

describe('UserAssignItemComponent', () => {
  let component: UserAssignItemComponent;
  let fixture: ComponentFixture<UserAssignItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssignItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
