import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EmailSubmissionFormComponent} from './email-submission-form.component';
import {FormBuilder} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EmailSubmissionFormComponent', () => {
    let component: EmailSubmissionFormComponent;
    let fixture: ComponentFixture<EmailSubmissionFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, FlexLayoutModule, BrowserAnimationsModule, TranslateLibModule, HttpClientTestingModule],
            declarations: [EmailSubmissionFormComponent],
            providers: [FormBuilder]
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
