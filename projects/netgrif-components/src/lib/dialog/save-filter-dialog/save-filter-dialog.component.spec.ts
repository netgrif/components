import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveFilterDialogComponent} from './save-filter-dialog.component';
import {
    AuthenticationMethodService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    TestConfigurationService,
    TranslateLibModule,
    DialogModule,
    AuthenticationService,
    MockAuthenticationService,
    UserResourceService,
    MockUserResourceService
} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PanelComponentModule} from '../../panel/panel.module';
import {RouterTestingModule} from '@angular/router/testing';
import {SaveFilterComponent} from '../../side-menu/content-components/save-filter/save-filter.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('SaveFilterDialogComponent', () => {
    let component: SaveFilterDialogComponent;
    let fixture: ComponentFixture<SaveFilterDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SaveFilterDialogComponent],
            imports: [
                MaterialModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                PanelComponentModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([]),
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
        fixture = TestBed.createComponent(SaveFilterDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
