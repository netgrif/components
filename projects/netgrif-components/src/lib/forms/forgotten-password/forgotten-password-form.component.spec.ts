import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgottenPasswordFormComponent} from './forgotten-password-form.component';
import {
    ConfigurationService,
    MaterialModule,
    SignUpService,
    TestConfigurationService,
    TranslateLibModule
} from '@netgrif/components-core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ForgottenPasswordFormComponent', () => {
    let component: ForgottenPasswordFormComponent;
    let fixture: ComponentFixture<ForgottenPasswordFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            declarations: [ForgottenPasswordFormComponent],
            providers: [
                SignUpService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgottenPasswordFormComponent);
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
