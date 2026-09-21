import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationDoubleDrawerComponent} from './navigation-double-drawer.component';
import {NavigationDrawerComponent} from '../navigation-drawer/navigation-drawer.component';
import {NavigationTreeComponent} from '../navigation-tree/navigation-tree.component';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    AuthenticationModule,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserPreferenceService,
    MockUserResourceService,
    TestConfigurationService,
    TranslateLibModule,
    UserPreferenceService,
    SearchService,
    UserResourceService,
    NAE_TASK_VIEW_COMPONENT,
    NAE_BASE_FILTER,
    TaskViewService, TestTaskBaseFilterProvider
} from '@netgrif/components-core';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {QuickPanelComponentModule} from '../quick-panel/quick-panel.module';
import {UserComponentModule} from '../../user/user.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ResizableModule} from 'angular-resizable-element';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TaskViewDialogComponent} from "../../dialog/task-view-dialog/task-view-dialog.component";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('NavigationDoubleDrawerComponent', () => {
    let component: NavigationDoubleDrawerComponent;
    let fixture: ComponentFixture<NavigationDoubleDrawerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavigationDrawerComponent, NavigationTreeComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                QuickPanelComponentModule,
                UserComponentModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                ResizableModule,
                MatDialogModule,
                AuthenticationModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: UserPreferenceService, useClass: MockUserPreferenceService},
                {provide: NAE_TASK_VIEW_COMPONENT, useClass: TaskViewDialogComponent},
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: {searchBody: {}}},
                TaskViewService,
                SearchService,
                {provide: NAE_BASE_FILTER, useFactory: TestTaskBaseFilterProvider},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationDoubleDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
