import { AbstractSingleTaskViewComponent } from './abstract-single-task-view.component';
import { SideMenuControl } from '../../side-menu/models/side-menu-control';
import { NAE_SIDE_MENU_CONTROL } from '../../side-menu/side-menu-injection-token';
import { Component } from '@angular/core';
import { TaskViewService } from './service/task-view.service';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';
import { TranslateLibModule } from '../../translate/translate-lib.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurationService } from '../../configuration/configuration.service';
import { TestConfigurationService } from '../../utility/tests/test-config';
import { AuthenticationService } from '../../authentication/services/authentication/authentication.service';
import { MockAuthenticationMethodService } from '../../utility/tests/mocks/mock-authentication-method-service';
import { MockAuthenticationService } from '../../utility/tests/mocks/mock-authentication.service';
import { AuthenticationMethodService } from '../../authentication/services/authentication-method.service';
import { AllowedNetsService } from '../../allowed-nets/services/allowed-nets.service';
import { TestTaskViewAllowedNetsFactory } from '../../utility/tests/test-factory-methods';
import { AllowedNetsServiceFactory } from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import { of } from 'rxjs';
import { SearchService } from '../../search/search-service/search.service';
import { NAE_BASE_FILTER } from '../../search/models/base-filter-injection-token';
import { SimpleFilter } from '../../filter/models/simple-filter';

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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-single-task-view',
    template: ''
})
class TestSaveFilterComponent extends AbstractSingleTaskViewComponent {
    constructor(taskViewService: TaskViewService,
                activatedRoute: ActivatedRoute) {
        super(taskViewService, activatedRoute);
    }
}
