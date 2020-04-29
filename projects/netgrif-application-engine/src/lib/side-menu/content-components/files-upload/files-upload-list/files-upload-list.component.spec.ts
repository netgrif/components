import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../../../material/material.module';
import {CovalentModule} from '../../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {FileUploadService} from '../../../../data-fields/file-field/services/upload/file-upload.service';
import {FileDownloadService} from '../../../../data-fields/file-field/services/download/file-download.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {Component} from '@angular/core';
import {FileFieldService} from '../../../../data-fields/file-field/services/file-field.service';
import {FilesUploadListComponent} from './files-upload-list.component';
import {FilesUploadItemComponent} from './files-upload-item/files-upload-item.component';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FilesUploadListComponent', () => {
    let component: FilesUploadListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FilesUploadListComponent,
                FilesUploadItemComponent,
                TestWrapperComponent
            ],
            imports: [
                MaterialModule,
                CovalentModule,
                FlexLayoutModule,
                FlexModule,
                FormsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                FileUploadService,
                FileDownloadService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-files-upload-list [allFiles]="[]" [fileFieldService]="service"></nae-files-upload-list>',
    providers: [FileFieldService]
})
class TestWrapperComponent {
    service: FileFieldService;

    constructor(private _fileFieldService: FileFieldService) {
        this.service = this._fileFieldService;
    }
}
