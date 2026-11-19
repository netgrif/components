import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {MatSortModule} from '@angular/material/sort';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractSortModeComponent} from './abstract-sort-mode.component';
import {CaseHeaderService} from '../../case-header/case-header.service';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {TestViewService} from '../../../utility/tests/test-view-service';
import {ViewService} from '../../../routing/view-service/view.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {AllowedNetsService} from '../../../allowed-nets/services/allowed-nets.service';
import {TestNoAllowedNetsFactory} from '../../../utility/tests/test-factory-methods';
import {AllowedNetsServiceFactory} from '../../../allowed-nets/services/factory/allowed-nets-service-factory';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractSortModeComponent', () => {
    let component: TestSortModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let headerSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestSortModeComponent, TestWrapperComponent],
            imports: [
                FlexModule,
                FlexLayoutModule,
                MatSortModule,
                TranslateLibModule,
                MatSnackBarModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CaseHeaderService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        headerSpy = spyOn(TestBed.inject(CaseHeaderService), 'sortHeaderChanged');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call sort header changed', () => {
        component.sortHeaderChanged({active: '7-hello', direction: 'asc'});
        expect(headerSpy).toHaveBeenCalledWith(7, 'hello', 'asc');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        headerSpy.calls.reset();
    });
});

@Component({
    selector: 'ncc-test-sort',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestSortModeComponent extends AbstractSortModeComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-sort [headerService]="service"></ncc-test-sort>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}

