import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {GridsterModule} from 'angular-gridster2';
import {ResizableModule} from 'angular-resizable-element';
import {AngularResizedEventModule} from 'angular-resize-event';
import {MaterialImportModule} from '../../material-import/material-import.module';
import {FormBuilderModule} from '../form-builder.module';

import {FieldListComponent} from './field-list.component';

describe('FieldListComponent', () => {
  let component: FieldListComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestWrapperComponent],
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
        RouterTestingModule,
        BrowserAnimationsModule,
        FormBuilderModule,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'nc-builder-test-wrapper',
  template: '<nc-builder-field-list ></nc-builder-field-list><div id="ctxMenu"></div>',
})
class TestWrapperComponent {
}
