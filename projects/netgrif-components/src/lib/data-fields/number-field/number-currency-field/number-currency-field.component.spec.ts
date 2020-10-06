import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberCurrencyFieldComponent } from './number-currency-field.component';

describe('NumberCurrencyFieldComponent', () => {
  let component: NumberCurrencyFieldComponent;
  let fixture: ComponentFixture<NumberCurrencyFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberCurrencyFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberCurrencyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
