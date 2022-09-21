import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImpersonateQuickPanelComponent} from './impersonate-quick-panel.component';
import {
    AuthenticationMethodService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    SnackBarService,
    TranslateLibModule
} from 'netgrif-components-core';
import {
    NaeExampleAppConfigurationService
} from '../../../../../../../nae-example-app/src/app/nae-example-app-configuration.service';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ImpersonateQuickPanelComponent', () => {
    let component: ImpersonateQuickPanelComponent;
    let fixture: ComponentFixture<ImpersonateQuickPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            declarations: [ImpersonateQuickPanelComponent],
            providers: [
                SnackBarService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImpersonateQuickPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
