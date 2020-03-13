import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignSidemenuExampleComponent } from './user-assign-sidemenu-example.component';

describe('UserAssignSidemenuExampleComponent', () => {
  let component: UserAssignSidemenuExampleComponent;
  let fixture: ComponentFixture<UserAssignSidemenuExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssignSidemenuExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignSidemenuExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
