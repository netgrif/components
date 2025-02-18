import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DefaultPublicWorkflowViewComponent} from './default-public-workflow-view.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {AuthenticationMethodService,
    AuthenticationService, ConfigurationService, MaterialModule, MockAuthenticationMethodService,
    MockAuthenticationService, MockUserResourceService,
    OverflowService,
    TestConfigurationService, TestViewService, TranslateLibModule, UserResourceService, ViewService, WorkflowHeaderService } from '@netgrif/components-core';
import {PanelComponentModule} from "../../../../../panel/panel.module";
import {HeaderComponentModule} from "../../../../../header/header.module";
import {
    SideMenuContentComponentModule
} from "../../../../../side-menu/content-components/side-menu-content-component.module";
import {RouterTestingModule} from "@angular/router/testing";

describe('DefaultPublicWorkflowViewComponent', () => {
    let component: DefaultPublicWorkflowViewComponent;
    let fixture: ComponentFixture<DefaultPublicWorkflowViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                DefaultPublicWorkflowViewComponent
            ],
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                PanelComponentModule,
                HeaderComponentModule,
                HttpClientTestingModule,
                SideMenuContentComponentModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([], {relativeLinkResolution: 'legacy'})
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                WorkflowHeaderService,
                OverflowService
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
});
