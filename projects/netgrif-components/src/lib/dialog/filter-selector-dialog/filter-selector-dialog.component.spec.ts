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
    UserResourceService
} from 'netgrif-components-core';
import {MatDialogModule} from '@angular/material/dialog';

describe('FilterSelectorDialogComponent', () => {
    let component: FilterSelectorDialogComponent;
    let fixture: ComponentFixture<FilterSelectorDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SideMenuFilterSelectorComponentModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                MatDialogModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
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
