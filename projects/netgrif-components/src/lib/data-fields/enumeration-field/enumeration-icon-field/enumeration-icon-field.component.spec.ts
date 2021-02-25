import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumerationIconFieldComponent } from './enumeration-icon-field.component';

describe('EnumerationIconFieldComponent', () => {
  let component: EnumerationIconFieldComponent;
  let fixture: ComponentFixture<EnumerationIconFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumerationIconFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumerationIconFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
