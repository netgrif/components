import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HtmlTextareaFieldComponent} from './html-textarea-field.component';
import {QuillModule} from 'ngx-quill';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HtmlTextareaFieldComponent', () => {
    let component: HtmlTextareaFieldComponent;
    let fixture: ComponentFixture<HtmlTextareaFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [QuillModule.forRoot(), MaterialModule, TranslateLibModule, HttpClientTestingModule],
            declarations: [HtmlTextareaFieldComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HtmlTextareaFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
