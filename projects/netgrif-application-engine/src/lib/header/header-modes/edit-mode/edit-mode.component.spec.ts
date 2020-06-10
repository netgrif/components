import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EditModeComponent} from './edit-mode.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CaseHeaderService, CaseMetaField} from '../../case-header/case-header.service';
import {Component} from '@angular/core';
import {HeaderColumn, HeaderColumnType} from '../../models/header-column';
import {SearchService} from '../../../search/search-service/search.service';
import {TestCaseSearchServiceFactory, TestCaseViewFactory} from '../../../utility/tests/test-factory-methods';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {ConfigCaseViewServiceFactory} from '../../../view/case-view/service/factory/config-case-view-service-factory';
import {MaterialModule} from '../../../material/material.module';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {ViewService} from '../../../routing/view-service/view.service';
import {TestViewService} from '../../../utility/tests/test-view-service';
import {RouterModule} from '@angular/router';

describe('EditModeComponent', () => {
    let component: EditModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let headerSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditModeComponent, TestWrapperComponent],
            imports: [
                FlexModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                RouterModule.forRoot([]),
            ],
            providers: [
                CaseHeaderService,
                ConfigCaseViewServiceFactory,
                AuthenticationMethodService,
                {
                    provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory
                },
                {
                    provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [ConfigCaseViewServiceFactory]
                },
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        headerSpy = spyOn(TestBed.inject(CaseHeaderService), 'headerColumnSelected');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call headerColumnSelected', () => {
        component.headerColumnSelected(0, new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'Title', 'text'));
        expect(headerSpy).toHaveBeenCalledWith(0, new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'Title', 'text'));
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-edit-mode [headerService]="service"></nae-edit-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}
