import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicWorkflowViewComponent} from './public-workflow-view.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TestViewService,
    TranslateLibModule,
    UserResourceService,
    ViewService,
    OverflowService,
    WorkflowHeaderService
} from '@netgrif/components-core';
import {PanelComponentModule, SideMenuContentComponentModule, HeaderComponentModule} from '@netgrif/components';

describe('PublicWorkflowViewComponent', () => {
    let component: PublicWorkflowViewComponent;
    let fixture: ComponentFixture<PublicWorkflowViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                PublicWorkflowViewComponent
            ],
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                PanelComponentModule,
                HeaderComponentModule,
                HttpClientTestingModule,
                SideMenuContentComponentModule,
                TranslateLibModule,
                RouterModule.forRoot([], {relativeLinkResolution: 'legacy'})
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
        fixture = TestBed.createComponent(PublicWorkflowViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
