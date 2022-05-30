import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, Injector} from '@angular/core';
import {AbstractTabViewComponent} from './abstract-tab-view.component';
import {ViewService} from '../../routing/view-service/view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TabContent} from '../interfaces';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MaterialModule} from '../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TestViewService} from '../../utility/tests/test-view-service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('AbstractTabViewComponent', () => {
    let component: TestTabComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService}
            ],
            declarations: [
                TestComponent,
                TestTabComponent,
                TestWrapperComponent,
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    TestComponent
                ]
            }
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
    selector: 'ncc-test-tabs',
    template: ''
})
class TestTabComponent extends AbstractTabViewComponent {
    constructor(protected _viewService: ViewService, protected _logger: LoggerService, parentInjector: Injector) {
        super(_viewService, _logger, parentInjector);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-tabs [initialTabs]="tabs"></ncc-test-tabs>'
})
class TestWrapperComponent {
    tabs: Array<TabContent> = [
        {
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: false,
            tabContentComponent: TestComponent
        }
    ];
}

@Component({
    selector: 'ncc-test-div',
    template: '<div></div>'
})
class TestComponent {
}
