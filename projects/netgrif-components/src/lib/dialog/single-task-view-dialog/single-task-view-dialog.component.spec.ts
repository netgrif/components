import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleTaskViewDialogComponent } from './single-task-view-dialog.component';
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

describe('SingleTaskViewDialogComponent', () => {
    let component: SingleTaskViewDialogComponent;
    let fixture: ComponentFixture<SingleTaskViewDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SingleTaskViewDialogComponent],
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
                { provide: MAT_DIALOG_DATA, useValue: {searchBody: {}} },
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
        fixture = TestBed.createComponent(SingleTaskViewDialogComponent);
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
