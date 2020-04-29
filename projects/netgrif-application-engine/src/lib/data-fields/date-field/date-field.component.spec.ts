import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DateFieldComponent} from './date-field.component';
import {MaterialModule} from '../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DateField} from './models/date-field';
import moment from 'moment';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DateFieldComponent', () => {
    let component: DateFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, TranslateLibModule, HttpClientTestingModule],
            declarations: [
                DateFieldComponent,
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
        expect(component.getErrorMessage()).toEqual('This is custom message!');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-date-field [dataField]="field"></nae-date-field>'
})
class TestWrapperComponent {
    field = new DateField('', '', moment(new Date()), {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, [
        {validationRule: 'weekend', validationMessage: 'This is custom message!'},
        {validationRule: 'workday', validationMessage: 'This is custom message!'}
        ]);
}

