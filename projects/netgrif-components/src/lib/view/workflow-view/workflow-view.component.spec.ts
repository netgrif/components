import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WorkflowViewComponent} from './workflow-view.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SideMenuContentComponentModule} from '../../side-menu/content-components/side-menu-content-component.module';
import {RouterModule} from '@angular/router';
import {
    MaterialModule,
    TranslateLibModule,
    AuthenticationMethodService,
    AuthenticationService,
    UserResourceService,
    ConfigurationService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    ViewService,
    TestViewService,
    WorkflowHeaderService
} from '@netgrif/application-engine';
import {PanelComponentModule} from '../../panel/panel.module';
import {HeaderComponentModule} from '../../header/header.module';

describe('WorkflowViewComponent', () => {
    let component: WorkflowViewComponent;
    let fixture: ComponentFixture<WorkflowViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowViewComponent
            ],
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientModule,
                PanelComponentModule,
                HeaderComponentModule,
                HttpClientTestingModule,
                SideMenuContentComponentModule,
                TranslateLibModule,
                RouterModule.forRoot([])
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                WorkflowHeaderService
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
