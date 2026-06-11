import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialImportModule} from '../../material-import/material-import.module';

import {InfoLabelComponent} from './info-label.component';

describe('InfoLabelComponent', () => {
  let component: InfoLabelComponent;
  let fixture: ComponentFixture<InfoLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InfoLabelComponent],
      imports: [
        MaterialImportModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
