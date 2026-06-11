import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialImportModule} from '../../material-import/material-import.module';

import {DialogDeleteComponent} from './dialog-delete.component';

describe('DialogDeleteComponent', () => {
  let component: DialogDeleteComponent;
  let fixture: ComponentFixture<DialogDeleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteComponent],
      imports: [MaterialImportModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
