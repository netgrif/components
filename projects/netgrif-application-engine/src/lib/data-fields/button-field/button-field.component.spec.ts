import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonFieldComponent} from './button-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ButtonField} from './models/button-field';
import {MaterialModule} from '../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../required-label/required-label.component';

describe('ButtonFieldComponent', () => {
    let component: ButtonFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule],
            declarations: [
                ButtonFieldComponent,
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

    it('should get error message', () => {
        component.dataField.value = undefined;
        expect(component.getErrorMessage()).toEqual('This field is required!');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-button-field [dataField]="field"></nae-button-field>'
})
class TestWrapperComponent {
    field = new ButtonField('', '', {
        required: true,
    });
}

