import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RichTextareaFieldComponent} from './rich-textarea-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TextField} from '../models/text-field';
import {FormControl} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CovalentModule} from '../../../covalent/covalent.module';

describe('RichTextareaFieldComponent', () => {
    let component: RichTextareaFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, CovalentModule, BrowserAnimationsModule],
            declarations: [RichTextareaFieldComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: `
        <nae-rich-textarea-field [showLargeLayout]="label"
                                 [formControlRef]="formControl"
                                 [textAreaField]="dataField"></nae-rich-textarea-field>`
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    dataField = new TextField('', '', 'text', {
        editable: true
    });
    formControl = new FormControl();

    constructor() {
        this.formControl.enable();
    }
}
