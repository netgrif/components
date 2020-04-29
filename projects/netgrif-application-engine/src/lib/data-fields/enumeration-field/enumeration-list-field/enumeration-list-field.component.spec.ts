import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EnumerationListFieldComponent} from './enumeration-list-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {EnumerationField} from '../models/enumeration-field';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormControl} from '@angular/forms';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EnumerationListFieldComponent', () => {
    let component: EnumerationListFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, BrowserAnimationsModule, TranslateLibModule, HttpClientTestingModule],
            declarations: [EnumerationListFieldComponent, TestWrapperComponent],
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-enumeration-list-field [showLargeLayout]="label" [enumerationField]="field" [formControlRef]="form">' +
        '</nae-enumeration-list-field>'
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new EnumerationField('', '', '', [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
    form = new FormControl();
}
