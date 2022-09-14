import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {
    AbstractMultichoiceAutocompleteFieldComponentComponent
} from './abstract-multichoice-autocomplete-field-component.component';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';
import {MultichoiceField} from '../models/multichoice-field';

describe('AbstractMultichoiceAutocompleteFieldComponentComponent', () => {
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
    selector: 'ncc-test-enum-auto',
    template: ''
})
class TestEnumAutoComponent extends AbstractMultichoiceAutocompleteFieldComponentComponent {

}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-enum-auto [showLargeLayout]="label" [enumerationField]="field" [formControlRef]="form">' +
        '</ncc-test-enum-auto>'
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new MultichoiceField('', '', [''], [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
    form = new FormControl();
}
