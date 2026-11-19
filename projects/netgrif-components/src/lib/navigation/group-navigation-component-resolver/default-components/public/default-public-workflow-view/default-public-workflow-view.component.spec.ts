import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DefaultPublicWorkflowViewComponent} from './default-public-workflow-view.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    OverflowService, ProcessService,
    TestConfigurationService,
    TestViewService,
    TranslateLibModule,
    UserResourceService,
    ViewService,
    WorkflowHeaderService,
    MockProcessService,
    PetriNetResourceService,
    MockPetrinetResourceService, ProcessServiceProvider
} from '@netgrif/components-core';
import {PanelComponentModule} from "../../../../../panel/panel.module";
import {HeaderComponentModule} from "../../../../../header/header.module";
import {
    SideMenuContentComponentModule
} from "../../../../../side-menu/content-components/side-menu-content-component.module";
import {RouterTestingModule} from "@angular/router/testing";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('DefaultPublicWorkflowViewComponent', () => {
    let component: DefaultPublicWorkflowViewComponent;
    let fixture: ComponentFixture<DefaultPublicWorkflowViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                DefaultPublicWorkflowViewComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [
                MaterialModule,
                PanelComponentModule,
                HeaderComponentModule,
                SideMenuContentComponentModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                WorkflowHeaderService,
                OverflowService,
                {provide: ProcessService, useClass: MockProcessService},
                {provide: PetriNetResourceService, useClass: MockPetrinetResourceService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultPublicWorkflowViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
