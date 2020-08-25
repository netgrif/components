import {FilesUploadComponent} from './files-upload.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SideMenuFilesUploadComponentModule} from './side-menu-files-upload-component.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Observable} from 'rxjs';
import {NgModule} from '@angular/core';
import {
    TranslateLibModule,
    FileFieldService,
    TestConfigurationService,
    ConfigurationService,
    SideMenuControl,
    NAE_SIDE_MENU_CONTROL
} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FilesUploadComponent', () => {
    let component: FilesUploadComponent;
    let fixture: ComponentFixture<FilesUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SideMenuFilesUploadComponentModule,
                NoopAnimationsModule,
                TestFileFieldServiceProviderModule,
                TranslateLibModule, HttpClientTestingModule
            ],
            declarations: [],
            providers: [
                FileFieldService,
                {
                    provide: NAE_SIDE_MENU_CONTROL,
                    useValue: new SideMenuControl(() => {}, new Observable<boolean>(), null, FileFieldService)
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilesUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // TODO 24.4.2020 - NOT POSSIBLE TO TEST because of not covered errors in filefield
    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [FileFieldService]
})
class TestFileFieldServiceProviderModule {
}

