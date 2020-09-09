import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {FileFieldService} from '../../../data-fields/file-field/services/file-field.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {Component, Inject} from '@angular/core';
import {AbstractFilesUploadComponent} from './abstract-files-upload.component';

describe('AbstractFilesUploadComponent', () => {
    let component: TestFilesUploadComponent;
    let fixture: ComponentFixture<TestFilesUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            declarations: [TestFilesUploadComponent],
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
        fixture = TestBed.createComponent(TestFilesUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-files',
    template: ''
})
class TestFilesUploadComponent extends AbstractFilesUploadComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) injectedData: SideMenuControl) {
        super(injectedData);
    }
}
