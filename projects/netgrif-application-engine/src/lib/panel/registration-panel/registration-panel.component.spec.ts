import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPanelComponent } from './registration-panel.component';

describe('RegistrationPanelComponent', () => {
  let component: RegistrationPanelComponent;
  let fixture: ComponentFixture<RegistrationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
