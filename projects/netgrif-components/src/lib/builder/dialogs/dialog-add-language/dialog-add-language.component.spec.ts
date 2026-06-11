import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialImportModule} from '../../material-import/material-import.module';

import {DialogAddLanguageComponent} from './dialog-add-language.component';

describe('DialogAddLanguageComponent', () => {
  let component: DialogAddLanguageComponent;
  let fixture: ComponentFixture<DialogAddLanguageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddLanguageComponent],
      imports: [MaterialImportModule, HttpClientTestingModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
