import {AbstractEnumerationAutocompleteDynamicFieldComponent} from './abstract-enumeration-autocomplete-dynamic-field.component';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';
import {DynamicEnumerationField} from '../models/dynamic-enumeration-field';

describe('AbstractEnumerationAutocompleteSelectFieldComponent', () => {
    let component: TestEnumAutoComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            declarations: [TestEnumAutoComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
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
    selector: 'nae-test-enum-auto',
    template: ''
})
class TestEnumAutoComponent extends AbstractEnumerationAutocompleteDynamicFieldComponent {
    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-enum-auto [showLargeLayout]="label" [enumerationField]="field" [formControlRef]="form">' +
        '</nae-test-enum-auto>'
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new DynamicEnumerationField('', '', 'test', [{key: 'test', value: 'test'}], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, undefined, undefined, undefined, {name: 'autocomplete_dynamic'});
    form = new FormControl();
}
