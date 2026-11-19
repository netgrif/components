import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationFormComponent} from './registration-form.component';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    ConfigurationService,
    MaterialModule,
    SignUpService,
    TestConfigurationService,
    TranslateLibModule
} from '@netgrif/components-core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('RegistrationPanelComponent', () => {
    let component: RegistrationFormComponent;
    let fixture: ComponentFixture<RegistrationFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RegistrationFormComponent],
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
        fixture = TestBed.createComponent(RegistrationFormComponent);
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
