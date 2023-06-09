import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseDialogComponent } from './new-case-dialog.component';

describe('NewCaseDialogComponent', () => {
  let component: NewCaseDialogComponent;
  let fixture: ComponentFixture<NewCaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
