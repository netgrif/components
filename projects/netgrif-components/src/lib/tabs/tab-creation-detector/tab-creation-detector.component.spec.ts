import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {TabCreationDetectorComponent} from './tab-creation-detector.component';
import {Component, Injector, NgModule, OnInit} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    LoggerService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TabContent,
    TabView,
    TestConfigurationService,
    TestViewService,
    UserResourceService,
    ViewService
} from '@netgrif/application-engine';

describe('TabCreationDetectorComponent', () => {
    let component: TabCreationDetectorComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TabTestModule,
                NoopAnimationsModule,
                RouterModule.forRoot([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService}
            ],
            declarations: [
                TabCreationDetectorComponent,
                TestWrapperComponent,
            ]
        })
            .compileComponents();

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
    selector: 'nc-test-wrapper',
    template: '<nc-tab-creation-detector [initializeTabFunction]="initializeTabLambda" [tabIndex]="0"></nc-tab-creation-detector>'
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
    selector: 'nc-test-div',
    template: '<div></div>'
})
class TestComponent {
}

@NgModule({
    declarations: [TestComponent],
    entryComponents: [TestComponent]
})
class TabTestModule {
}
