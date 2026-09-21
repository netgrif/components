import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterSelectorDialogComponent} from './filter-selector-dialog.component';
import {
    SideMenuFilterSelectorComponentModule
} from '../../side-menu/content-components/filter-selector/side-menu-filter-selector-component.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
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

describe('FilterSelectorDialogComponent', () => {
    let component: FilterSelectorDialogComponent;
    let fixture: ComponentFixture<FilterSelectorDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilterSelectorDialogComponent],
            imports: [
                MaterialModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
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
                { provide: UserResourceService, useClass: MockUserResourceService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterSelectorDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
