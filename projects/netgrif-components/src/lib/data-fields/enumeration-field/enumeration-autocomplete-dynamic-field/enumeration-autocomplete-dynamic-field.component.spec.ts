import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumerationAutocompleteDynamicFieldComponent } from './enumeration-autocomplete-dynamic-field.component';

describe('EnumerationAutocompleteDynamicFieldComponent', () => {
  let component: EnumerationAutocompleteDynamicFieldComponent;
  let fixture: ComponentFixture<EnumerationAutocompleteDynamicFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumerationAutocompleteDynamicFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumerationAutocompleteDynamicFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
