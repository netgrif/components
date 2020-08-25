import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {FilesUploadItemComponent} from './files-upload-item.component';
import {
    MaterialModule,
    CovalentModule,
    ConfigurationService,
    TestConfigurationService,
    FileFieldService,
    FileUploadModel
} from '@netgrif/application-engine';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
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
    selector: 'nc-test-wrapper',
    template: '<nc-files-upload-item [file]="file" [fileFieldService]="service"></nc-files-upload-item>',
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
