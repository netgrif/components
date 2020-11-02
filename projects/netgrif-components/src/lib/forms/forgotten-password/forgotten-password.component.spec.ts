import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgottenPasswordComponent} from './forgotten-password.component';
import {
    ConfigurationService,
    MaterialModule,
    SignUpService,
    TestConfigurationService,
    TranslateLibModule
} from 'netgrif-application-engine';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ForgottenPasswordComponent', () => {
    let component: ForgottenPasswordComponent;
    let fixture: ComponentFixture<ForgottenPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            declarations: [ForgottenPasswordComponent],
            providers: [
                SignUpService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgottenPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
