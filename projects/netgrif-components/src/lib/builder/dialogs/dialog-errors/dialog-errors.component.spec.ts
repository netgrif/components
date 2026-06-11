import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogErrorsComponent} from './dialog-errors.component';

describe('DialogErrorsComponent', () => {
  let component: DialogErrorsComponent;
  let fixture: ComponentFixture<DialogErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogErrorsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
