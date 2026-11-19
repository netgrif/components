import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {SimpleTextFieldComponent} from './simple-text-field/simple-text-field.component';
import {TextareaFieldComponent} from './textarea-field/textarea-field.component';
import {RichTextareaFieldComponent} from './rich-textarea-field/rich-textarea-field.component';
import {TextFieldComponent} from './text-field.component';
import {CovalentModule, MaterialModule, TextField, TranslateLibModule} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TextFieldComponent', () => {
    let component: TextFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                DataFieldTemplateComponent,
                SimpleTextFieldComponent,
                TextareaFieldComponent,
                RichTextareaFieldComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [
                MaterialModule,
                CovalentModule,
                TranslateLibModule
            ],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-text-field [dataField]="field"></nc-text-field>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    field = new TextField('', '', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, []);
}
