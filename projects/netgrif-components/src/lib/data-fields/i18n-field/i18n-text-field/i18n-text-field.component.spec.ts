import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nTextFieldComponent } from './i18n-text-field.component';

describe('I18nTextFieldComponent', () => {
  let component: I18nTextFieldComponent;
  let fixture: ComponentFixture<I18nTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I18nTextFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
