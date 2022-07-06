import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultichoiceAutocompleteFieldComponent } from './multichoice-autocomplete-field.component';

describe('MultichoiceAutocompleteFieldComponent', () => {
  let component: MultichoiceAutocompleteFieldComponent;
  let fixture: ComponentFixture<MultichoiceAutocompleteFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultichoiceAutocompleteFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultichoiceAutocompleteFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
