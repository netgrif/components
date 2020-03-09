import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumerationAutocompleteSelectFieldComponent } from './enumeration-autocomplete-select-field.component';

describe('EnumerationAutocompleteSelectFieldComponent', () => {
  let component: EnumerationAutocompleteSelectFieldComponent;
  let fixture: ComponentFixture<EnumerationAutocompleteSelectFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumerationAutocompleteSelectFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumerationAutocompleteSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
