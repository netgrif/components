import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationOverlayComponent } from './authentication-overlay.component';

describe('AuthenticationOverlayComponent', () => {
  let component: AuthenticationOverlayComponent;
  let fixture: ComponentFixture<AuthenticationOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
