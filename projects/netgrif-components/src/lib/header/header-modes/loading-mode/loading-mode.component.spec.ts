import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingModeComponent} from './loading-mode.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    MaterialModule,
    TranslateLibModule,
    CaseHeaderService,
    ConfigCaseViewServiceFactory,
    AuthenticationMethodService,
    SearchService,
    TestCaseSearchServiceFactory,
    CaseViewService,
    TestCaseViewFactory,
    AuthenticationService,
    UserResourceService,
    ConfigurationService,
    ViewService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TestViewService,
    MockAuthenticationMethodService
} from '@netgrif/application-engine';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoadingModeComponent', () => {
    let component: LoadingModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadingModeComponent, TestWrapperComponent],
            imports: [
                FlexModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CaseHeaderService,
                ConfigCaseViewServiceFactory,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {
                    provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory
                },
                {
                    provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [ConfigCaseViewServiceFactory]
                },
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
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
    selector: 'nc-test-wrapper',
    template: '<nc-loading-mode [headerService]="service"></nc-loading-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}
