import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextFieldComponent } from './simple-text-field.component';

describe('SimpleTextFieldComponent', () => {
  let component: SimpleTextFieldComponent;
  let fixture: ComponentFixture<SimpleTextFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTextFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
