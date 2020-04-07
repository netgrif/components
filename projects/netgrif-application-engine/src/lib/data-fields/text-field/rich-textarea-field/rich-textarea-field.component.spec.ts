import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextareaFieldComponent } from './rich-textarea-field.component';

describe('RichTextareaFieldComponent', () => {
  let component: RichTextareaFieldComponent;
  let fixture: ComponentFixture<RichTextareaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextareaFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextareaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
