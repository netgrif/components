import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {AngularResizeEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {SimpleTextFieldComponent} from './simple-text-field/simple-text-field.component';
import {TextareaFieldComponent} from './textarea-field/textarea-field.component';
import {RichTextareaFieldComponent} from './rich-textarea-field/rich-textarea-field.component';
import {TextFieldComponent} from './text-field.component';
import {CovalentModule, MaterialModule, TextField, TranslateLibModule} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TextFieldComponent', () => {
    let component: TextFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizeEventModule, NoopAnimationsModule,
                CovalentModule, TranslateLibModule, HttpClientTestingModule],
            declarations: [
                DataFieldTemplateComponent,
                SimpleTextFieldComponent,
                TextareaFieldComponent,
                RichTextareaFieldComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
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
    template: '<nc-text-field [dataField]="field"></nc-text-field>'
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
