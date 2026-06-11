import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GridsterModule} from 'angular-gridster2';
import {ResizableModule} from 'angular-resizable-element';
import {AngularResizedEventModule} from 'angular-resize-event';
import {MaterialImportModule} from '../../material-import/material-import.module';

import {EditPanelComponent} from './edit-panel.component';

describe('EditPanelComponent', () => {
  let component: EditPanelComponent;
  let fixture: ComponentFixture<EditPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditPanelComponent],
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
        BrowserAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
