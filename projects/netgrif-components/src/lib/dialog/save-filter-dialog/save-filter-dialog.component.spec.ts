import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveFilterDialogComponent} from './save-filter-dialog.component';
import {
    AuthenticationMethodService,
    ConfigurationService,
    MaterialModule, MockAuthenticationMethodService, TestConfigurationService,
    TranslateLibModule
} from 'netgrif-components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PanelComponentModule} from '../../panel/panel.module';
import {RouterTestingModule} from '@angular/router/testing';
import {SaveFilterComponent} from '../../side-menu/content-components/save-filter/save-filter.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('SaveFilterDialogComponent', () => {
    let component: SaveFilterDialogComponent;
    let fixture: ComponentFixture<SaveFilterDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                PanelComponentModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([]),
                MatDialogModule
            ],
            declarations: [SaveFilterComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            ]
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
