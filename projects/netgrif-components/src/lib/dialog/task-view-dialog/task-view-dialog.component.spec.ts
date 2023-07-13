import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskViewDialogComponent } from './task-view-dialog.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {PanelComponentModule} from "../../panel/panel.module";
import {RouterTestingModule} from "@angular/router/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {
    MaterialModule,
    TranslateLibModule,
    MockAuthenticationMethodService,
    ConfigurationService,
    TestConfigurationService,
    AuthenticationMethodService,
    AuthenticationService,
    MockAuthenticationService,
    UserResourceService,
    MockUserResourceService
} from '@netgrif/components-core';
import {HeaderComponentModule} from "../../header/header.module";

describe('TaskViewDialogComponent', () => {
    let component: TaskViewDialogComponent;
    let fixture: ComponentFixture<TaskViewDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskViewDialogComponent],
            imports: [
                MaterialModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                PanelComponentModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([]),
                HeaderComponentModule,
                MatDialogModule
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService },
                { provide: ConfigurationService, useClass: TestConfigurationService },
                { provide: AuthenticationService, useClass: MockAuthenticationService },
                { provide: UserResourceService, useClass: MockUserResourceService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskViewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
