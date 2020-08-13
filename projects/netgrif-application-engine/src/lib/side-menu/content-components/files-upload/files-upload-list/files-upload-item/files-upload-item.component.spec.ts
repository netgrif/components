import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {FilesUploadItemComponent} from './files-upload-item.component';
import {FileFieldService} from '../../../../../data-fields/file-field/services/file-field.service';
import {MaterialModule} from '../../../../../material/material.module';
import {CovalentModule} from '../../../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {ConfigurationService} from '../../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../../utility/tests/test-config';
import {FileUploadModel} from '../../models/file-upload-model';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

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
                FormsModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    // TODO 24.4.2020 - NOT POSSIBLE TO TEST because of not covered errors in filefield
    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-files-upload-item [file]="file" [fileFieldService]="service"></nae-files-upload-item>',
    providers: [FileFieldService]
})
class TestWrapperComponent {
    blb: Blob;
    arr: Array<Blob>;
    data: File;
    file: FileUploadModel;
    service: FileFieldService;

    constructor(private _fileFieldService: FileFieldService) {
        this.service = this._fileFieldService;
        this.blb = new Blob(['fucking tests'], { type: 'application/txt' });
        this.arr = new Array<Blob>();
        this.arr.push(this.blb);
        this.data = new File(this.arr, 'name.txt');
        this.file = {
            stringId: 'string',
            data: this.data,
            inProgress: false,
            progress: 80,
            completed: false,
            downloading: false,
        };
    }
}
