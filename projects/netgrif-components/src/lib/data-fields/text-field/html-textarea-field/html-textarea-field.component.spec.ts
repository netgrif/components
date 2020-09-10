import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlTextareaFieldComponent } from './html-textarea-field.component';

describe('HtmlTextareaFieldComponent', () => {
  let component: HtmlTextareaFieldComponent;
  let fixture: ComponentFixture<HtmlTextareaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlTextareaFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlTextareaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
