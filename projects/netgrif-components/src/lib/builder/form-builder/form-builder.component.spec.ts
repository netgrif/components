import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {GridsterModule} from 'angular-gridster2';
import {ResizableModule} from 'angular-resizable-element';
import {AngularResizedEventModule} from 'angular-resize-event';
import {MaterialImportModule} from '../material-import/material-import.module';

import {FormBuilderComponent} from './form-builder.component';
import {FormBuilderModule} from './form-builder.module';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        DragDropModule,
        GridsterModule,
        FormsModule,
        HttpClientModule,
        MaterialImportModule,
        FlexLayoutModule,
        AngularResizedEventModule,
        ResizableModule,
        FormBuilderModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([{path: 'modeler', redirectTo: ''}]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
