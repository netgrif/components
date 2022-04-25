import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, Injector, OnInit} from '@angular/core';
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
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractTabCreationDetectorComponent', () => {
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
                {provide: ViewService, useClass: TestViewService},
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
    selector: 'nae-test-tabs',
    template: ''
})
class TestTabComponent extends AbstractTabCreationDetectorComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-tabs [initializeTabFunction]="initializeTabLambda" [tabIndex]="0"></nae-test-tabs>'
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
    selector: 'nae-test-div',
    template: '<div></div>'
})
class TestComponent {
}
