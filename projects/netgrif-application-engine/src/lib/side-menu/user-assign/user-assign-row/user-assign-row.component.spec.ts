import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignRowComponent } from './user-assign-row.component';

describe('UserAssignRowComponent', () => {
  let component: UserAssignRowComponent;
  let fixture: ComponentFixture<UserAssignRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssignRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
