import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ForgottenPasswordCardComponent} from "./forgotten-password-panel.component";

describe('ForgottenPasswordPanelComponent', () => {
  let component: ForgottenPasswordCardComponent ;
  let fixture: ComponentFixture<ForgottenPasswordCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ForgottenPasswordCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgottenPasswordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
