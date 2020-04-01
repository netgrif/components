import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DateFieldComponent} from './date-field.component';
import {MaterialModule} from '../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DateField} from './models/date-field';
import moment from 'moment';

describe('DateFieldComponent', () => {
    let component: DateFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule],
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
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-date-field [dataField]="field"></nae-date-field>'
})
class TestWrapperComponent {
    field = new DateField('', '', moment(), {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}

