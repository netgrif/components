import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultichoiceFieldComponent} from './multichoice-field.component';
import {MaterialModule} from '../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {MultichoiceSelectFieldComponent} from './multichoice-select-field/multichoice-select-field.component';
import {MultichoiceListFieldComponent} from './multichoice-list-field/multichoice-list-field.component';
import {MultichoiceField} from './models/multichoice-field';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MultichoiceFieldComponent', () => {
    let component: MultichoiceFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, BrowserAnimationsModule, TranslateLibModule, HttpClientTestingModule],
            declarations: [
                DataFieldTemplateComponent,
                MultichoiceFieldComponent,
                MultichoiceListFieldComponent,
                MultichoiceSelectFieldComponent,
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
    template: '<nae-multichoice-field [dataField]="field"></nae-multichoice-field>'
})
class TestWrapperComponent {
    field = new MultichoiceField('', '', [''], [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}
