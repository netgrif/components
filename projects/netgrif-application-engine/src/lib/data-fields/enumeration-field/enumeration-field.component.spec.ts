import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumerationFieldComponent } from './enumeration-field.component';

describe('EnumerationFieldComponent', () => {
  let component: EnumerationFieldComponent;
  let fixture: ComponentFixture<EnumerationFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumerationFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumerationFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
