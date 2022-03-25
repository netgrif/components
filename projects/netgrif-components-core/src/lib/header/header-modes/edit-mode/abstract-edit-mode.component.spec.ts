import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component} from '@angular/core';
import {AbstractEditModeComponent} from './abstract-edit-mode.component';
import {TranslateService} from '@ngx-translate/core';
import {CaseHeaderService} from '../../case-header/case-header.service';
import {HeaderColumn, HeaderColumnType} from '../../models/header-column';
import {CaseMetaField} from '../../case-header/case-menta-enum';
import {ViewService} from '../../../routing/view-service/view.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {SearchService} from '../../../search/search-service/search.service';
import {TestCaseBaseFilterProvider, TestCaseViewAllowedNetsFactory} from '../../../utility/tests/test-factory-methods';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {TestViewService} from '../../../utility/tests/test-view-service';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggerService} from '../../../logger/services/logger.service';
import {NAE_BASE_FILTER} from '../../../search/models/base-filter-injection-token';
import {AllowedNetsService} from '../../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../../allowed-nets/services/factory/allowed-nets-service-factory';

describe('AbstractEditModeComponent', () => {
    let component: TestEditModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let headerSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestEditModeComponent, TestWrapperComponent],
            imports: [
                FlexModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CaseHeaderService,
                CaseViewService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        }).compileComponents();
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-edit',
    template: ''
})
class TestEditModeComponent extends AbstractEditModeComponent {
    constructor(protected _translate: TranslateService, protected _log: LoggerService) {
        super(_translate, _log);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-edit [headerService]="service"></ncc-test-edit>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}
