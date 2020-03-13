import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeFieldComponent } from './date-time-field.component';

describe('DatetimeFieldComponent', () => {
  let component: DateTimeFieldComponent;
  let fixture: ComponentFixture<DateTimeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
