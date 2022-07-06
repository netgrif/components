import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractMultichoiceAutocompleteFieldComponentComponent } from './abstract-multichoice-autocomplete-field-component.component';

describe('AbstractMultichoiceAutocompleteFieldComponentComponent', () => {
  let component: AbstractMultichoiceAutocompleteFieldComponentComponent;
  let fixture: ComponentFixture<AbstractMultichoiceAutocompleteFieldComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractMultichoiceAutocompleteFieldComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractMultichoiceAutocompleteFieldComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
