import {AbstractSaveFilterComponent} from './abstract-save-filter.component';
import {Component, Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {UserFiltersService} from '../../../filter/user-filters.service';
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
import {TaskViewService} from '../../../view/task-view/service/task-view.service';
import {AllowedNetsService} from '../../../allowed-nets/services/allowed-nets.service';
import {TestTaskViewAllowedNetsFactory} from '../../../utility/tests/test-factory-methods';
import {AllowedNetsServiceFactory} from '../../../allowed-nets/services/factory/allowed-nets-service-factory';
import {SearchService} from '../../../search/search-service/search.service';
import {NAE_BASE_FILTER} from '../../../search/models/base-filter-injection-token';
import {SimpleFilter} from '../../../filter/models/simple-filter';

describe('AbstractSaveFilterComponent', () => {
    let component: TestSaveFilterComponent;
    let fixture: ComponentFixture<TestSaveFilterComponent>;

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
                TaskViewService,
                {provide: AllowedNetsService, useFactory: TestTaskViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                SearchService,
                {provide: NAE_BASE_FILTER, useValue: {filter: SimpleFilter.emptyTaskFilter()}}
            ],
            declarations: [
                TestSaveFilterComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestSaveFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-save-filter',
    template: ''
})
class TestSaveFilterComponent extends AbstractSaveFilterComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) sideMenuControl: SideMenuControl,
                filterService: UserFiltersService,
                log: LoggerService,
                taskViewService: TaskViewService) {
        super(sideMenuControl, filterService, log, taskViewService);
    }
}
