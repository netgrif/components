import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumerationListFieldComponent } from './enumeration-list-field.component';

describe('EnumerationListFieldComponent', () => {
  let component: EnumerationListFieldComponent;
  let fixture: ComponentFixture<EnumerationListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumerationListFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumerationListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
