import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AbstractEnumerationAutocompleteSelectFieldComponent} from './abstract-enumeration-autocomplete-select-field.component';
import {TranslateService} from '@ngx-translate/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {EnumerationField} from '../models/enumeration-field';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';

describe('AbstractEnumerationAutocompleteSelectFieldComponent', () => {
    let component: TestEnumAutoComponent;
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
class TestEnumAutoComponent extends AbstractEnumerationAutocompleteSelectFieldComponent {
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
    field = new EnumerationField('', '', 'test', [{key: 'test', value: 'test'}], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
    form = new FormControl();
}
