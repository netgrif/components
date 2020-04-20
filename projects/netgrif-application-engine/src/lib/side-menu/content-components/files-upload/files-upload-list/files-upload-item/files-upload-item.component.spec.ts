import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {FilesUploadItemComponent} from './files-upload-item.component';
import {FileFieldService} from '../../../../../data-fields/file-field/services/file-field.service';
import {MaterialModule} from '../../../../../material/material.module';
import {CovalentModule} from '../../../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {FileUploadService} from '../../../../../data-fields/file-field/services/upload/file-upload.service';
import {FileDownloadService} from '../../../../../data-fields/file-field/services/download/file-download.service';

describe('FilesUploadItemComponent', () => {
    let component: FilesUploadItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FilesUploadItemComponent,
                TestWrapperComponent
            ],
            imports: [
                MaterialModule,
                CovalentModule,
                FlexLayoutModule,
                FlexModule,
                FormsModule
            ],
            providers: [FileUploadService, FileDownloadService]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-files-upload-item [file]="file" [fileFieldService]="service"></nae-files-upload-item>',
    providers: [FileFieldService]
})
class TestWrapperComponent {
    file = undefined;
    service: FileFieldService;
    constructor(private _fileFieldService: FileFieldService) {
        this.service = this._fileFieldService;
    }
}
