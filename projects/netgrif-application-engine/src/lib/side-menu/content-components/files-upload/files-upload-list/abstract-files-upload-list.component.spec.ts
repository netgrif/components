import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, Inject} from '@angular/core';
import {MaterialModule} from '../../../../material/material.module';
import {CovalentModule} from '../../../../covalent/covalent.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {MockAuthenticationMethodService} from '../../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {FileFieldService} from '../../../../data-fields/file-field/services/file-field.service';
import {AbstractFilesUploadListComponent} from './abstract-files-upload-list.component';

describe('AbstractFilesUploadListComponent', () => {
    let component: TestFilesUploadListComponent;
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
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                TestFilesUploadListComponent,
                TestWrapperComponent
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-files-list',
    template: ''
})
class TestFilesUploadListComponent extends AbstractFilesUploadListComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-files-list [allFiles]="[]" [fileFieldService]="service"></nae-test-files-list>',
    providers: [FileFieldService]
})
class TestWrapperComponent {
    service: FileFieldService;

    constructor(private _fileFieldService: FileFieldService) {
        this.service = this._fileFieldService;
    }
}
