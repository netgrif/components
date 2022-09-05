import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {LdapGroupRolesAssignComponent} from './ldap-group-roles-assign.component';


describe('LdapGroupRolesAssignComponent', () => {
  let component: LdapGroupRolesAssignComponent;
  let fixture: ComponentFixture<LdapGroupRolesAssignComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LdapGroupRolesAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdapGroupRolesAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
