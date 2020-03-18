import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FileFieldComponent} from './file-field.component';
import {MaterialModule} from '../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FileField} from './models/file-field';
import {FileFieldService} from './services/file-field.service';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {FileUploadService} from './services/upload/file-upload.service';
import {FileDownloadService} from './services/download/file-download.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FileFieldComponent', () => {
    let component: FileFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, BrowserAnimationsModule, HttpClientTestingModule],
            declarations: [FileFieldComponent, TestWrapperComponent],
            providers: [FileFieldService, SideMenuService, FileUploadService, FileDownloadService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-file-field [dataField]="field"></nae-file-field>'
})
class TestWrapperComponent {
    field = new FileField('', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}


