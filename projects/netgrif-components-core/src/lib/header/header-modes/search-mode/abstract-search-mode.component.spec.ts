import {waitForAsync, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {AbstractSearchModeComponent} from './abstract-search-mode.component';
import {CaseHeaderService} from '../../case-header/case-header.service';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {MaterialModule} from '../../../material/material.module';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {SearchService} from '../../../search/search-service/search.service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {TestCaseBaseFilterProvider, TestCaseViewAllowedNetsFactory} from '../../../utility/tests/test-factory-methods';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TestViewService} from '../../../utility/tests/test-view-service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {ViewService} from '../../../routing/view-service/view.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {NAE_BASE_FILTER} from '../../../search/models/base-filter-injection-token';
import {AllowedNetsService} from '../../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../../allowed-nets/services/factory/allowed-nets-service-factory';
import {MatDialog} from '@angular/material/dialog';

describe('AbstractSearchModeComponent', () => {
    let component: TestSeaarchModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let headerSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FlexModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule,
                MaterialModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CaseViewService,
                SearchService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                CaseHeaderService,
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: [TestSeaarchModeComponent, TestWrapperComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        headerSpy = spyOn(TestBed.inject(CaseHeaderService), 'headerSearchInputChanged');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call search header', fakeAsync(() => {
        component.formControls[0].setValue('hladaj');
        tick(600);
        expect(headerSpy).toHaveBeenCalledWith(0, 'hladaj');
    }));

    it('should transform UserValue into id', fakeAsync(() => {
        component.formControls[0].setValue(new UserValue('7', '', '', ''));
        tick(600);
        expect(headerSpy).toHaveBeenCalledWith(0, '7');
    }));

    afterEach(() => {
        TestBed.resetTestingModule();
        headerSpy.calls.reset();
    });
});

@Component({
    selector: 'ncc-test-search',
    template: ''
})
class TestSeaarchModeComponent extends AbstractSearchModeComponent {
    constructor(protected _dialog: MatDialog) {
        super(_dialog);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-search [headerService]="service"></ncc-test-search>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}
