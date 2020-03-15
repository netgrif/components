import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EnumerationFieldComponent} from './enumeration-field.component';
import {MaterialModule} from '../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {EnumerationField} from './models/enumeration-field';
import {EnumerationSelectFieldComponent} from './enumeration-select-field/enumeration-select-field.component';
import {EnumerationListFieldComponent} from './enumeration-list-field/enumeration-list-field.component';
import {
    EnumerationAutocompleteSelectFieldComponent
} from './enumeration-autocomplete-select-field/enumeration-autocomplete-select-field.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('EnumerationFieldComponent', () => {
    let component: EnumerationFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, BrowserAnimationsModule],
            declarations: [
                EnumerationFieldComponent,
                EnumerationSelectFieldComponent,
                EnumerationListFieldComponent,
                EnumerationAutocompleteSelectFieldComponent,
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                TestWrapperComponent
            ],
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
    template: '<nae-enumeration-field [enumerationField]="field"></nae-enumeration-field>'
})
class TestWrapperComponent {
    field = new EnumerationField('', '', {key: '', value: ''}, [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}
