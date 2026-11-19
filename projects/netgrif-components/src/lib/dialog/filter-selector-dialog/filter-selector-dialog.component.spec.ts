import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterSelectorDialogComponent} from './filter-selector-dialog.component';
import {
    SideMenuFilterSelectorComponentModule
} from '../../side-menu/content-components/filter-selector/side-menu-filter-selector-component.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    AuthenticationMethodService,
    AuthenticationService, ConfigurationService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,TestConfigurationService,
    UserResourceService,
    MaterialModule,
    TranslateLibModule
} from '@netgrif/components-core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {RouterTestingModule} from "@angular/router/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {PanelComponentModule} from "../../panel/panel.module";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FilterSelectorDialogComponent', () => {
    let component: FilterSelectorDialogComponent;
    let fixture: ComponentFixture<FilterSelectorDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilterSelectorDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                MaterialModule,
                PanelComponentModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([]),
                MatDialogModule,
                SideMenuFilterSelectorComponentModule
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService },
                { provide: ConfigurationService, useClass: TestConfigurationService },
                { provide: AuthenticationService, useClass: MockAuthenticationService },
                { provide: UserResourceService, useClass: MockUserResourceService },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterSelectorDialogComponent);
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
