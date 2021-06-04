import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoTitleConfigContent2CaseViewComponent } from './demo-title-config-content2-case-view.component';
import {
    CaseHeaderService,
    ConfigurationService,
    MaterialModule,
    NAE_TAB_DATA,
    AuthenticationMethodService,
    MockAuthenticationMethodService
} from 'netgrif-application-engine';
import {
    HeaderComponentModule
} from 'netgrif-components';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NaeExampleAppConfigurationService} from '../../../../nae-example-app-configuration.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('DemoTitleConfigContent2CaseViewComponent', () => {
    let component: DemoTitleConfigContent2CaseViewComponent;
    let fixture: ComponentFixture<DemoTitleConfigContent2CaseViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                HttpClientTestingModule,
                HeaderComponentModule,
                BrowserAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: NAE_TAB_DATA, useValue: {tabViewComponent: undefined, tabViewOrder: 1}},
                {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService},
                CaseHeaderService
                ],
            declarations: [DemoTitleConfigContent2CaseViewComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoTitleConfigContent2CaseViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
