import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDialogWithAnswerComponent } from './question-dialog-with-answer.component';

describe('QuestionDialogWithAnswerComponent', () => {
  let component: QuestionDialogWithAnswerComponent;
  let fixture: ComponentFixture<QuestionDialogWithAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDialogWithAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDialogWithAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
