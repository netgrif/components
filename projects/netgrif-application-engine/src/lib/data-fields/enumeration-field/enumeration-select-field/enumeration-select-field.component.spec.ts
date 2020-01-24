import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumerationSelectFieldComponent } from './enumeration-select-field.component';

describe('EnumerationSelectFieldComponent', () => {
  let component: EnumerationSelectFieldComponent;
  let fixture: ComponentFixture<EnumerationSelectFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumerationSelectFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumerationSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
