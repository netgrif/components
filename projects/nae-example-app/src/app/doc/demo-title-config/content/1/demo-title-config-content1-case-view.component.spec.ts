import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoTitleConfigContent1CaseViewComponent } from './demo-title-config-content1-case-view.component';
import {
    CaseHeaderService,
    ConfigurationService,
    MaterialModule,
    NAE_TAB_DATA,
    AuthenticationMethodService,
    MockAuthenticationMethodService
} from '@netgrif/components-core';
import {
    HeaderComponentModule
} from '@netgrif/components';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NaeExampleAppConfigurationService} from '../../../../nae-example-app-configuration.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('DemoTitleConfigContent1CaseViewComponent', () => {
    let component: DemoTitleConfigContent1CaseViewComponent;
    let fixture: ComponentFixture<DemoTitleConfigContent1CaseViewComponent>;

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
            declarations: [DemoTitleConfigContent1CaseViewComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoTitleConfigContent1CaseViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
