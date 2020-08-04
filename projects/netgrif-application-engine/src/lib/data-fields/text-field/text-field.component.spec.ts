import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialModule} from '../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {SimpleTextFieldComponent} from './simple-text-field/simple-text-field.component';
import {TextareaFieldComponent} from './textarea-field/textarea-field.component';
import {RichTextareaFieldComponent} from './rich-textarea-field/rich-textarea-field.component';
import {TextFieldComponent} from './text-field.component';
import {TextField} from './models/text-field';
import {CovalentModule} from '../../covalent/covalent.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TextFieldComponent', () => {
    let component: TextFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, NoopAnimationsModule,
                CovalentModule, TranslateLibModule, HttpClientTestingModule],
            declarations: [
                DataFieldTemplateComponent,
                SimpleTextFieldComponent,
                TextareaFieldComponent,
                RichTextareaFieldComponent,
                RequiredLabelComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-text-field [dataField]="field"></nae-text-field>'
})
class TestWrapperComponent {
    field = new TextField('', '', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, [{validationRule: 'email', validationMessage: 'custom message'}]);
}
