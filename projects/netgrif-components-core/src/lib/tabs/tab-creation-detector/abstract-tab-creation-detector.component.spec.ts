import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Injector, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {MaterialModule} from '../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {TestViewService} from '../../utility/tests/test-view-service';
import {ViewService} from '../../routing/view-service/view.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AbstractTabCreationDetectorComponent} from './abstract-tab-creation-detector.component';
import {TabView} from '../classes/tab-view';
import {TabContent} from '../interfaces';
import {LoggerService} from '../../logger/services/logger.service';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractTabCreationDetectorComponent', () => {
    let component: TestTabComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TestTabComponent,
                TestWrapperComponent
            ],
            imports: [
                MaterialModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
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
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestTabComponent extends AbstractTabCreationDetectorComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-tabs [initializeTabFunction]="initializeTabLambda" [tabIndex]="0"></ncc-test-tabs>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent implements OnInit {
    tabGroup: TabView;
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
    initializeTabLambda = (index: number) => {
        this.tabGroup.initializeTab(index);
    }

    constructor(private viewService: ViewService, private logger: LoggerService, private parentInjector: Injector) {
    }

    ngOnInit(): void {
        this.tabGroup = new TabView(this.viewService, this.logger, this.tabs, this.parentInjector);
    }
}

@Component({
    selector: 'ncc-test-div',
    template: '<div></div>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestComponent {
}
