import {waitForAsync, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {WorkflowViewComponent} from './workflow-view.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SideMenuContentComponentModule} from '../../side-menu/content-components/side-menu-content-component.module';
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
    WorkflowHeaderService, LanguageService
} from '@netgrif/components-core';
import {PanelComponentModule} from '../../panel/panel.module';
import {HeaderComponentModule} from '../../header/header.module';
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {SearchComponentModule} from "../../search/search.module";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

describe('WorkflowViewComponent', () => {
    let component: WorkflowViewComponent;
    let fixture: ComponentFixture<WorkflowViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowViewComponent
            ],
            imports: [
                TranslateLibModule,
                MaterialModule,
                NoopAnimationsModule,
                PanelComponentModule,
                HeaderComponentModule,
                HttpClientTestingModule,
                SideMenuContentComponentModule,
                CommonModule,
                SearchComponentModule,
                RouterTestingModule.withRoutes([])
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                TranslatePipe,
                TranslateService,
                LanguageService,
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

    beforeEach(waitForAsync(async () => {
        fixture = TestBed.createComponent(WorkflowViewComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
        fixture.detectChanges();
    }));

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
