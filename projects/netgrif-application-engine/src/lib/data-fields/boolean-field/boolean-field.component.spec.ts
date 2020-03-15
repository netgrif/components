import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BooleanFieldComponent} from './boolean-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BooleanField} from './models/boolean-field';
import {MaterialModule} from '../../material/material.module';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {RequiredLabelComponent} from '../required-label/required-label.component';

describe('BooleanFieldComponent', () => {
    let component: BooleanFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule],
            declarations: [
                BooleanFieldComponent,
                DataFieldTemplateComponent,
                RequiredLabelComponent,
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
    template: '<nae-boolean-field [booleanField]="field"></nae-boolean-field>'
})
class TestWrapperComponent {
    field = new BooleanField('', '', true, {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}
