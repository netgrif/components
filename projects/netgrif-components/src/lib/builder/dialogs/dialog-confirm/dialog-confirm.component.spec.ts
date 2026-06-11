import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialImportModule} from '../../material-import/material-import.module';

import {DialogConfirmComponent} from './dialog-confirm.component';

describe('DialogConfirmComponent', () => {
  let component: DialogConfirmComponent;
  let fixture: ComponentFixture<DialogConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfirmComponent],
      imports: [MaterialImportModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
