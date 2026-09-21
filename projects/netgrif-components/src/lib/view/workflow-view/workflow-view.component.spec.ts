import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {WorkflowViewComponent} from './workflow-view.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SideMenuContentComponentModule} from '../../side-menu/content-components/side-menu-content-component.module';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    LanguageService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockProcessService,
    MockUserResourceService,
    OverflowService,
    ProcessService,
    TestConfigurationService,
    TestViewService,
    TranslateLibModule,
    UserResourceService,
    ViewService,
    WorkflowHeaderService
} from '@netgrif/components-core';
import {PanelComponentModule} from '../../panel/panel.module';
import {HeaderComponentModule} from '../../header/header.module';
import {CommonModule} from "@angular/common";
import {SearchComponentModule} from "../../search/search.module";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";

describe('WorkflowViewComponent', () => {
    let component: WorkflowViewComponent;
    let fixture: ComponentFixture<WorkflowViewComponent>;
    let translateService: TranslateService;

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
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                TranslatePipe,
                LanguageService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                WorkflowHeaderService,
                OverflowService,
                {provide: ProcessService, useClass: MockProcessService},
            ]
        })
            .compileComponents();
        translateService = TestBed.inject(TranslateService);
        // Set up translations
        translateService.setTranslation('en', {
            'search.fullText': 'Enter searched phrase'
        });
        translateService.use('en');

    }));

    beforeEach(fakeAsync(async () => {
        fixture = TestBed.createComponent(WorkflowViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
    }));

    it('should create', fakeAsync(() => {
        expect(component).toBeTruthy();
        tick();
    }));


    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
