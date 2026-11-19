import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {EmailSubmissionFormComponent} from './email-submission-form.component';
import {FormBuilder} from '@angular/forms';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {ConfigurationService, MaterialModule, TestConfigurationService, TranslateLibModule} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {LegalNoticeModule} from '../../legal/legal-notice/legal-notice.module';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('EmailSubmissionFormComponent', () => {
    let component: EmailSubmissionFormComponent;
    let fixture: ComponentFixture<EmailSubmissionFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [EmailSubmissionFormComponent],
            imports: [
                MaterialModule,
                FlexLayoutModule,
                TranslateLibModule,
                LegalNoticeModule
            ],
            providers: [
                FormBuilder,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmailSubmissionFormComponent);
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
