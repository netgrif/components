import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveTextFieldComponent } from './reactive-text-field.component';

describe('ReactiveTextFieldComponent', () => {
  let component: ReactiveTextFieldComponent;
  let fixture: ComponentFixture<ReactiveTextFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveTextFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
