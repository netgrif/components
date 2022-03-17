import {AbstractLoadFilterComponent} from './abstract-load-filter.component';
import {Component, Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {LoggerService} from '../../../logger/services/logger.service';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {AllowedNetsService} from '../../../allowed-nets/services/allowed-nets.service';
import {TestCaseViewAllowedNetsFactory} from '../../../utility/tests/test-factory-methods';
import {AllowedNetsServiceFactory} from '../../../allowed-nets/services/factory/allowed-nets-service-factory';
import {SearchService} from '../../../search/search-service/search.service';
import {NAE_BASE_FILTER} from '../../../search/models/base-filter-injection-token';
import {SimpleFilter} from '../../../filter/models/simple-filter';

describe('AbstractLoadFilterComponent', () => {
    let component: TestLoadFilterComponent;
    let fixture: ComponentFixture<TestLoadFilterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                {
                    provide: NAE_SIDE_MENU_CONTROL,
                    useValue: new SideMenuControl(undefined, undefined, () => of('close'), {allowedNets$: of([])})
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                CaseViewService,
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                SearchService,
                {provide: NAE_BASE_FILTER, useValue: {filter: SimpleFilter.emptyCaseFilter()}}
            ],
            declarations: [
                TestLoadFilterComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestLoadFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-save-filter',
    template: ''
})
class TestLoadFilterComponent extends AbstractLoadFilterComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) sideMenuControl: SideMenuControl,
                log: LoggerService,
                caseViewService: CaseViewService) {
        super(sideMenuControl, log, caseViewService);
    }
}
