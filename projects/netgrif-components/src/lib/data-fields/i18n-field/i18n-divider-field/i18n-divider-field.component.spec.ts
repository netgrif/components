import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nDividerFieldComponent } from './i18n-divider-field.component';

describe('I18nDividerFieldComponent', () => {
  let component: I18nDividerFieldComponent;
  let fixture: ComponentFixture<I18nDividerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I18nDividerFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nDividerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
