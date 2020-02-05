import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignListComponent } from './user-assign-list.component';

describe('UserAssignListComponent', () => {
  let component: UserAssignListComponent;
  let fixture: ComponentFixture<UserAssignListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssignListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
