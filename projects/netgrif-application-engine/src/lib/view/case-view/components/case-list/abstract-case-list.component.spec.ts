import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {CaseResourceService} from '../../../../resources/engine-endpoint/case-resource.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {CaseViewService} from '../../service/case-view-service';
import {SearchService} from '../../../../search/search-service/search.service';
import {Component, Inject, Optional} from '@angular/core';
import {AbstractCaseListComponent} from './abstract-case-list.component';
import {LoggerService} from '../../../../logger/services/logger.service';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../../../utility/tests/mocks/mock-authentication-method-service';
import {NAE_TAB_DATA} from '../../../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../../../tabs/interfaces';
import {NAE_BASE_FILTER} from '../../../../search/models/base-filter-injection-token';
import {TestCaseBaseFilterProvider, TestCaseViewAllowedNetsFactory} from '../../../../utility/tests/test-factory-methods';
import {AllowedNetsService} from '../../../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../../../allowed-nets/services/factory/allowed-nets-service-factory';


describe('AbstractCaseListComponent', () => {
    let component: TestCaseComponent;
    let fixture: ComponentFixture<TestCaseComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                CaseViewService,
                {provide: CaseResourceService, useClass: MyResources},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: [TestCaseComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCaseComponent);
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
    selector: 'nae-test-case',
    template: ''
})
class TestCaseComponent extends AbstractCaseListComponent {
    constructor(protected _caseViewService: CaseViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData) {
        super(_caseViewService, _log, injectedTabData);
    }
}

class MyResources {
    searchCases(filter, params) {
        return of({
            content: [], pagination: {
                number: -1,
                size: 0,
                totalPages: 0,
                totalElements: 0
            }
        });
    }
}
