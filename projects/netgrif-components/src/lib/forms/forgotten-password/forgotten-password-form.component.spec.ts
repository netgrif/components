import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgottenPasswordFormComponent} from './forgotten-password-form.component';
import {
    ConfigurationService,
    MaterialModule,
    SignUpService,
    TestConfigurationService,
    TranslateLibModule
} from '@netgrif/components-core';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('ForgottenPasswordFormComponent', () => {
    let component: ForgottenPasswordFormComponent;
    let fixture: ComponentFixture<ForgottenPasswordFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ForgottenPasswordFormComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                MaterialModule,
                FlexLayoutModule,
                TranslateLibModule
            ],
            providers: [
                SignUpService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
