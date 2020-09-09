import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '../../../../../material/material.module';
import {CovalentModule} from '../../../../../covalent/covalent.module';
import {ConfigurationService} from '../../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../../utility/tests/test-config';
import {FileFieldService} from '../../../../../data-fields/file-field/services/file-field.service';
import {FileUploadModel} from '../../models/file-upload-model';
import {AbstractFilesUploadItemComponent} from './abstract-files-upload-item.component';
import {TranslateLibModule} from '../../../../../translate/translate-lib.module';
import {AuthenticationMethodService} from '../../../../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../../../../utility/tests/mocks/mock-authentication-method-service';

describe('AbstractFilesUploadItemComponent', () => {
    let component: TestFilesUploadItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestFilesUploadItemComponent,
                TestWrapperComponent
            ],
            imports: [
                MaterialModule,
                CovalentModule,
                FlexLayoutModule,
                FlexModule,
                FormsModule,
                NoopAnimationsModule,
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-files-item',
    template: ''
})
class TestFilesUploadItemComponent extends AbstractFilesUploadItemComponent implements OnInit {
    constructor() {
        super();
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-files-item [file]="file" [fileFieldService]="service"></nae-test-files-item>',
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
