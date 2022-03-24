import {AbstractEnumerationIconFieldComponent} from './abstract-enumeration-icon-field.component';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {EnumerationField} from '../models/enumeration-field';
import {FormControl} from '@angular/forms';

describe('AbstractEnumerationIconFieldComponent', () => {
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
    selector: 'nae-test-enum-select',
    template: ''
})
class TestEnumSelectComponent extends AbstractEnumerationIconFieldComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-enum-select [showLargeLayout]="label" [enumerationField]="field" [formControlRef]="form">' +
        '</nae-test-enum-select>'
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new EnumerationField('', '', '', [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, undefined, undefined, undefined, {name: 'icon'});
    form = new FormControl();
}
