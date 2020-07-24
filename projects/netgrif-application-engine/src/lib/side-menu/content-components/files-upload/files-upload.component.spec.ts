import {FilesUploadComponent} from './files-upload.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SideMenuFilesUploadModule} from './side-menu-files-upload.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {FileFieldService} from '../../../data-fields/file-field/services/file-field.service';
import {NgModule} from '@angular/core';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FilesUploadComponent', () => {
    let component: FilesUploadComponent;
    let fixture: ComponentFixture<FilesUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SideMenuFilesUploadModule,
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

