import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {WorkflowViewComponent} from './workflow-view.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SideMenuContentComponentModule} from '../../side-menu/content-components/side-menu-content-component.module';
import {RouterModule} from '@angular/router';
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
import {PanelComponentModule} from '../../panel/panel.module';
import {HeaderComponentModule} from '../../header/header.module';

describe('WorkflowViewComponent', () => {
    let component: WorkflowViewComponent;
    let fixture: ComponentFixture<WorkflowViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowViewComponent
            ],
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                PanelComponentModule,
                HeaderComponentModule,
                HttpClientTestingModule,
                SideMenuContentComponentModule,
                TranslateLibModule,
                RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })
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
        fixture = TestBed.createComponent(WorkflowViewComponent);
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
