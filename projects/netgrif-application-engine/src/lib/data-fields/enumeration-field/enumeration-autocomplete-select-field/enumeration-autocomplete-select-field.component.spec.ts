import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EnumerationAutocompleteSelectFieldComponent} from './enumeration-autocomplete-select-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {EnumerationField} from '../models/enumeration-field';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('EnumerationAutocompleteSelectFieldComponent', () => {
    let component: EnumerationAutocompleteSelectFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, BrowserAnimationsModule],
            declarations: [EnumerationAutocompleteSelectFieldComponent, TestWrapperComponent],
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
    template: '<nae-enumeration-autocomplete-select-field [showLargeLayout]="label" [enumerationField]="field">' +
        '</nae-enumeration-autocomplete-select-field>'
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
}

