import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NumberFieldComponent} from './number-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NumberField} from './models/number-field';
import {MaterialModule} from '../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../required-label/required-label.component';

describe('NumberFieldComponent', () => {
    let component: NumberFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule],
            declarations: [
                NumberFieldComponent,
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
    template: '<nae-number-field [numberField]="field"></nae-number-field>'
})
class TestWrapperComponent {
    field = new NumberField('', '', 5, {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}
