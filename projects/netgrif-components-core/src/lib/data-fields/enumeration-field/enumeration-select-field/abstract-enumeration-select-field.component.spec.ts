import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AbstractEnumerationSelectFieldComponent} from './abstract-enumeration-select-field.component';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {MaterialModule} from '../../../material/material.module';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {EnumerationField} from '../models/enumeration-field';

describe('AbstractEnumerationSelectFieldComponent', () => {
    let component: TestEnumSelectComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            declarations: [TestEnumSelectComponent, TestWrapperComponent],
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-enum-select',
    template: ''
})
class TestEnumSelectComponent extends AbstractEnumerationSelectFieldComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-enum-select [showLargeLayout]="label" [enumerationField]="field" [formControlRef]="form">' +
        '</ncc-test-enum-select>'
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
