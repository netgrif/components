import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {Component} from '@angular/core';
import {FilesUploadListComponent} from './files-upload-list.component';
import {FilesUploadItemComponent} from './files-upload-item/files-upload-item.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    MaterialModule,
    CovalentModule,
    TranslateLibModule,
    AuthenticationMethodService,
    AuthenticationService,
    UserResourceService,
    ConfigurationService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    FileFieldService
} from '@netgrif/application-engine';

describe('FilesUploadListComponent', () => {
    let component: FilesUploadListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CovalentModule,
                FlexLayoutModule,
                FlexModule,
                FormsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                FilesUploadListComponent,
                FilesUploadItemComponent,
                TestWrapperComponent
            ],
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
    selector: 'nc-test-wrapper',
    template: '<nc-files-upload-list [allFiles]="[]" [fileFieldService]="service"></nc-files-upload-list>',
    providers: [FileFieldService]
})
class TestWrapperComponent {
    service: FileFieldService;

    constructor(private _fileFieldService: FileFieldService) {
        this.service = this._fileFieldService;
    }
}
