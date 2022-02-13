import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {EmailSubmissionFormComponent} from './email-submission-form.component';
import {FormBuilder} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService, MaterialModule, TestConfigurationService, TranslateLibModule} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LegalNoticeModule} from '../../legal/legal-notice/legal-notice.module';

describe('EmailSubmissionFormComponent', () => {
    let component: EmailSubmissionFormComponent;
    let fixture: ComponentFixture<EmailSubmissionFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                LegalNoticeModule
            ],
            declarations: [EmailSubmissionFormComponent],
            providers: [
                FormBuilder,
                {provide: ConfigurationService, useClass: TestConfigurationService}
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
